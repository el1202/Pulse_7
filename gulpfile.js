// gulp говорит что установлены два пакета gulp и sync
const gulp = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const rename = require("gulp-rename");
// плагин для сжатия рисунков
const imagemin = require('gulp-imagemin');
// плагин для сжатия html
const htmlmin = require('gulp-htmlmin');

// задаем задачи - task
// Static server
/* server будет запускаться из папки src */
// baseDir: "src"
// заключ єтап - выгрузка чистовых файлов в папку dist
gulp.task('server', function() {

    browserSync({
        server: {
            baseDir: "dist"
        }
    });

    gulp.watch("src/*.html").on('change', browserSync.reload);
});

gulp.task('styles', function() { /* то что возвращет задача */
    // src/sass//**/* - **/* - следим не только за всеми расширениями, но и за всеми папками которые есть внутри
    return gulp.src("src/sass/**/*.+(scss|sass)") /* взяли файлы по опред адресу */
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError)) /* компилируем код из прописанного пути src/sass/*.+(scss|sass) */
        .pipe(rename({ prefix: "", suffix: ".min", /* файл пройдя компилирование сохр с расширением .min */ }))
        .pipe(autoprefixer())
        .pipe(cleanCSS({ compatibility: 'ie8' })) /* после автопрефикс файл будет очищаться */
        /* кладем полученные файлы по опред адресу */
        // .pipe(gulp.dest("src/css"))
        // заключ этап - выгруз в папку dist
        .pipe(gulp.dest("dist/css"))
        .pipe(browserSync.stream()); /* после изменений и сохранений опять перезапускаем браузер-синк */
});

// задача, которая будет следить за изменениями и обновления файлов стилей и html
gulp.task('watch', function() {
    // заключ этап - добавл расширение |css
    gulp.watch("src/sass/**/*.+(scss|sass|css)", gulp.parallel('styles'));
    gulp.watch("src/*.html").on('change', gulp.parallel('html'));
});

// запускаем задачи - завершени, дороботка по сжатию и выгрузке файлов в папку dist
gulp.task('html', function() {
    return gulp.src("src/*.html")
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest("dist/"));
});

gulp.task('scripts', function() {
    return gulp.src("src/js/**/*.js")
        .pipe(gulp.dest("dist/js"));
});

gulp.task('fonts', function() {
    return gulp.src("src/fonts/**/*")
        .pipe(gulp.dest("dist/fonts"));
});

gulp.task('icons', function() {
    return gulp.src("src/icons/**/*")
        .pipe(gulp.dest("dist/icons"));
});

gulp.task('mailer', function() {
    return gulp.src("src/mailer/**/*")
        .pipe(gulp.dest("dist/mailer"));
});

gulp.task('images', function() {
    return gulp.src("src/img/**/*")
        .pipe(imagemin())
        .pipe(gulp.dest("dist/img"));
});

// запускаем задачи -начало
/* 'default'- по умолчанию и параллел запуск команд, gulp.parallel('server', 'styles' */
// gulp.task('default', gulp.parallel('watch', 'server', 'styles')); 

// запускаем задачи -окончание, подключ остальн task в параллельное использование при pfgecrt gulp
gulp.task('default', gulp.parallel('watch', 'server', 'styles', 'scripts', 'fonts', 'icons', 'mailer', 'html', 'images'));