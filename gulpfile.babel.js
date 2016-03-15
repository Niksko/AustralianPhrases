import gulp from 'gulp';
import babel from 'gulp-babel';

gulp.task('default', () => {
  gulp.src('/src/server/schema/migrations/*')
      .pipe(babel())
      .pipe(gulp.dest('build/migrations'));
});
