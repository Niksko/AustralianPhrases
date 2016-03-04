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

/**
 * The first argument defines the way to resolve an ID to its object.
 * The second argument defines the way to resolve a node object to its GraphQL type.
 */
var { nodeInterface, nodeField } = nodeDefinitions(
  (globalId) => {
    let { id, type } = fromGlobalId(globalId);
    if (type === 'Example')
      return example;
    return null;
  },
  (obj) => {
    return exampleType;
  }
);

/*
 * Define a PartsOfSpeechType that is used as an enum
 */

var PartsOfSpeechType = new GraphQLEnumType({
  name: 'PartsOfSpeech',
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
  description: 'A single word used to fill in templates',
  fields: () => ({
    id: globalIdField('Word'),
    text: { 
      type: GraphQLString,
      description: 'The word itself that will be filled into templates'
    },
    nsfw: { 
      type: GraphQLBoolean,
      description: 'True if the word is NSFW, false otherwise'
    },
    partOfSpeech: {
      type: new GraphQLList(PartsOfSpeechType),
      description: 'The part of speech that this word belongs to'
    }
  }),
  interfaces: [ nodeInterface ]
});

/**
 * Define a phrase type that will also be used to fill in templates
 */
var PhraseType = new GraphQLObjectType({
  name: 'Phrase',
  description: 'A short phrase that is used to fill in templates',
  fields: () => ({
    id: globalIdField('Phrase'),
    text: {
      type: GraphQLString,
      description: 'The phrase itself that will be filled into templates'
    },
    nsfw : {
      type: GraphQLBoolean,
      description: 'True if the phrase is NSFW, false otherwise'
    },
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
    example: {
      type: exampleType,
      resolve: () => example
    }
  })
});

export var Schema = new GraphQLSchema({
  query: queryType
});
