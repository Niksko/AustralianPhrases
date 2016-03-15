import gulp from 'gulp';
import babel from 'gulp-babel';

gulp.task('migrations', () => {
  gulp.src('src/server/schema/migrations/*')
      .pipe(babel())
      .pipe(gulp.dest('build/schema/migrations'));
});

gulp.task('template', () => {
  gulp.src('src/server/schema/template.js')
    .pipe(babel())
    .pipe(gulp.dest('build/schema'));
});

gulp.task('word', () => {
  gulp.src('src/server/schema/word.js')
    .pipe(babel())
    .pipe(gulp.dest('build/schema'));
});

gulp.task('default', ['word', 'template', 'migrations']);
