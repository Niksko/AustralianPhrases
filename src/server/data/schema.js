import {
  GraphQLObjectType,
  GraphQLEnumType,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLList,
  GraphQLString,
  GraphQLSchema
} from 'graphql';

import {
  fromGlobalId,
  globalIdField,
  nodeDefinitions
} from 'graphql-relay';

import {
  PartOfSpeech,
  Word,
  Template
} from './database.js';

/**
 * The first argument defines the way to resolve an ID to its object.
 * The second argument defines the way to resolve a node object to its GraphQL type.
 */
var { nodeInterface, nodeField } = nodeDefinitions(
  (globalId) => {
    let { id, type } = fromGlobalId(globalId);
    if (type === 'Word') {
      return getWord(id);
    } else if (type === 'Template') {
      return getTemplate(id);
    } else if (type === 'PartOfSpeech') {
      return getPartOfSpeech(id);
    } else
      return null;
  },
  (obj) => {
    if (obj instanceof Word) {
      return WordType;
    } else if (obj instanceof Template) {
      return TemplateType;
    } else
      return null;
  }
);

/*
 * Define a PartsOfSpeechType that is used as an enum
 */

var PartsOfSpeechType = new GraphQLEnumType({
  name: 'PartOfSpeech',
  description: 'An enumeration of the parts of speech, used to fill in templates so that they make sense',
  values: {
    VERB: {value: 0},
    NOUN: {value: 1},
    ADJECTIVE: {value: 2},
    ADVERB: {value: 3},
    PRONOUN: {value: 4},
    CONJUNCTION: {value: 5},
    PREPOSITION: {value: 6},
    INTERJECTION: {value: 7},
    PHRASE: {value: 8}
  }
});

/**
 * Define a word type that will be used to fill in templates
 */
var WordType = new GraphQLObjectType({
  name: 'Word',
  description: 'A single word or phrase used to fill in templates',
  fields: () => ({
    id: globalIdField('Word'),
    text: { 
      type: GraphQLString,
      description: 'The word itself that will be filled into templates',
      resolve: 
    },
    nsfw: { 
      type: GraphQLBoolean,
      description: 'True if the word is NSFW, false otherwise'
    },
    partOfSpeech: {
      type: new GraphQLList(PartsOfSpeechType),
      description: 'The parts of speech that this word belongs to'
    }
  }),
  interfaces: [ nodeInterface ]
});

/**
 * Define a template type that will be filled with words or phrases
 */
var TemplateType = new GraphQLObjectType({
  name: 'Template',
  description: 'A template for generating a phrase. Contains slots for phrases and/or words as well as fixed text',
  fields: () => ({
    id: globalIdField('Template'),
    template: {
      type: new GraphQLList( new GraphQLUnionType({
        name: 'TemplateElements',
        types: [GraphQLString, PartsOfSpeechType]
      })),
      description: 'A template consisting of either fixed pieces of text, or parts of speech. This is used to create a random phrase'
    }
  }),
  interfaces: [ nodeInterface ]
});

var queryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    node: nodeField,
    template: {
      type: TemplateType,
      resolve: () => Template.find((err, templates) => {
        if (err) reject (err)
        else resolve(templates)
      });
    }
  })
});

export var Schema = new GraphQLSchema({
  query: queryType
});
