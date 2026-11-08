// Cloudflare Pages Content API with KV persistence + Embedded Seed Data
const SEED_DATA = JSON.parse(\{\
\ \ \"\g\e\n\e\r\a\l\"\:\ \{\
\ \ \ \ \"\s\i\t\e\N\a\m\e\"\:\ \"\V\i\s\i\o\n\T\e\c\h\ \E\n\g\i\n\e\e\r\i\n\g\ \L\t\d\.\"\,\
\ \ \ \ \"\t\a\g\l\i\n\e\"\:\ \"\C\i\v\i\l\ \&\ \E\l\e\c\t\r\o\-\M\e\c\h\a\n\i\c\a\l\ \S\o\l\u\t\i\o\n\s\"\,\
\ \ \ \ \"\s\u\b\t\i\t\l\e\"\:\ \"\A\ \T\R\U\S\T\E\D\ \E\P\C\ \P\A\R\T\N\E\R\ \I\N\ \C\I\V\I\L\ \&\ \E\L\E\C\T\R\O\-\M\E\C\H\A\N\I\C\A\L\ \I\N\F\R\A\S\T\R\U\C\T\U\R\E\"\,\
\ \ \ \ \"\h\q\A\d\d\r\e\s\s\"\:\ \"\C\o\r\p\o\r\a\t\e\ \H\Q\:\ \2\8\4\,\ \B\o\r\o\ \M\o\g\b\a\z\a\r\ \(\2\n\d\ \F\l\.\)\,\ \D\h\a\k\a\-\1\2\1\7\"\,\
\ \ \ \ \"\p\h\o\n\e\"\:\ \"\+\8\8\ \0\1\7\3\0\ \3\3\5\0\0\2\"\,\
\ \ \ \ \"\e\m\a\i\l\"\:\ \"\i\n\f\o\@\v\i\s\i\o\n\t\e\c\h\-\b\d\.\c\o\m\"\,\
\ \ \ \ \"\r\e\g\I\n\f\o\"\:\ \"\G\o\v\t\.\ \R\e\g\.\ \L\i\m\i\t\e\d\ \C\o\m\p\a\n\y\ \\\\\u\2\0\2\2\ \I\S\O\ \&\ \E\H\S\ \C\o\m\p\l\i\a\n\t\"\,\
\ \ \ \ \"\l\o\g\o\U\r\l\"\:\ \"\a\s\s\e\t\s\/\i\m\a\g\e\s\/\l\o\g\o\.\p\n\g\"\
\ \ \}\,\
\ \ \"\h\e\r\o\"\:\ \{\
\ \ \ \ \"\b\a\d\g\e\"\:\ \"\C\I\V\I\L\ \&\ \E\L\E\C\T\R\O\-\M\E\C\H\A\N\I\C\A\L\ \E\P\C\ \L\E\A\D\E\R\"\,\
\ \ \ \ \"\t\i\t\l\e\P\a\r\t\1\"\:\ \"\A\ \T\r\u\s\t\e\d\ \E\P\C\ \P\a\r\t\n\e\r\ \i\n\"\,\
\ \ \ \ \"\t\i\t\l\e\G\r\a\d\i\e\n\t\"\:\ \"\C\i\v\i\l\ \&\ \E\l\e\c\t\r\o\-\M\e\c\h\a\n\i\c\a\l\"\,\
\ \ \ \ \"\t\i\t\l\e\P\a\r\t\2\"\:\ \"\S\o\l\u\t\i\o\n\s\.\"\,\
\ \ \ \ \"\l\e\a\d\T\e\x\t\"\:\ \"\V\i\s\i\o\n\T\e\c\h\ \E\n\g\i\n\e\e\r\i\n\g\ \L\t\d\.\ \(\V\E\L\)\ \i\s\ \a\ \d\y\n\a\m\i\c\ \E\P\C\ \c\o\n\t\r\a\c\t\o\r\ \d\e\l\i\v\e\r\i\n\g\ \t\u\r\n\k\e\y\ \e\n\g\i\n\e\e\r\i\n\g\,\ \1\3\2\/\3\3\k\V\ \p\o\w\e\r\ \s\u\b\s\t\a\t\i\o\n\s\,\ \u\n\d\e\r\g\r\o\u\n\d\ \t\r\a\n\s\m\i\s\s\i\o\n\ \c\a\b\l\e\ \p\r\o\t\e\c\t\i\o\n\,\ \a\n\d\ \h\e\a\v\y\ \l\o\g\i\s\t\i\c\s\ \f\o\r\ \g\o\v\e\r\n\m\e\n\t\ \u\t\i\l\i\t\i\e\s\ \a\n\d\ \p\r\i\v\a\t\e\ \i\n\d\u\s\t\r\i\a\l\ \l\e\a\d\e\r\s\ \a\c\r\o\s\s\ \B\a\n\g\l\a\d\e\s\h\.\"\,\
\ \ \ \ \"\v\i\d\e\o\U\r\l\"\:\ \"\a\s\s\e\t\s\/\v\i\d\e\o\s\/\h\e\r\o\-\e\n\g\i\n\e\e\r\i\n\g\-\b\g\.\m\p\4\"\,\
\ \ \ \ \"\v\i\d\e\o\P\o\s\t\e\r\"\:\ \"\a\s\s\e\t\s\/\v\i\d\e\o\s\/\b\u\i\l\d\i\n\g\_\p\o\s\t\e\r\.\j\p\g\"\,\
\ \ \ \ \"\v\i\d\e\o\S\p\e\e\d\"\:\ \0\.\1\5\,\
\ \ \ \ \"\f\e\a\t\u\r\e\C\a\r\d\1\"\:\ \{\
\ \ \ \ \ \ \"\i\c\o\n\"\:\ \"\f\a\-\b\o\l\t\-\l\i\g\h\t\n\i\n\g\"\,\
\ \ \ \ \ \ \"\t\i\t\l\e\"\:\ \"\E\l\e\c\t\r\o\-\M\e\c\h\a\n\i\c\a\l\"\,\
\ \ \ \ \ \ \"\s\u\b\t\i\t\l\e\"\:\ \"\1\3\2\/\3\3\k\V\ \G\r\i\d\s\ \&\ \M\E\P\"\
\ \ \ \ \}\,\
\ \ \ \ \"\f\e\a\t\u\r\e\C\a\r\d\2\"\:\ \{\
\ \ \ \ \ \ \"\i\c\o\n\"\:\ \"\f\a\-\t\r\o\w\e\l\-\b\r\i\c\k\s\"\,\
\ \ \ \ \ \ \"\t\i\t\l\e\"\:\ \"\H\e\a\v\y\ \C\i\v\i\l\"\,\
\ \ \ \ \ \ \"\s\u\b\t\i\t\l\e\"\:\ \"\D\e\e\p\ \F\o\u\n\d\a\t\i\o\n\s\ \&\ \P\E\B\"\
\ \ \ \ \}\,\
\ \ \ \ \"\f\e\a\t\u\r\e\C\a\r\d\3\"\:\ \{\
\ \ \ \ \ \ \"\i\c\o\n\"\:\ \"\f\a\-\t\r\u\c\k\-\r\a\m\p\-\b\o\x\"\,\
\ \ \ \ \ \ \"\t\i\t\l\e\"\:\ \"\H\e\a\v\y\ \C\a\r\g\o\"\,\
\ \ \ \ \ \ \"\s\u\b\t\i\t\l\e\"\:\ \"\S\w\a\d\e\s\h\ \C\a\r\r\y\i\n\g\ \F\l\e\e\t\"\
\ \ \ \ \}\
\ \ \}\,\
\ \ \"\s\t\a\t\s\"\:\ \[\
\ \ \ \ \{\
\ \ \ \ \ \ \"\v\a\l\u\e\"\:\ \"\4\0\+\"\,\
\ \ \ \ \ \ \"\l\a\b\e\l\"\:\ \"\G\r\i\d\ \S\u\b\s\t\a\t\i\o\n\s\ \D\e\l\i\v\e\r\e\d\"\,\
\ \ \ \ \ \ \"\s\u\b\"\:\ \"\4\0\0\k\V\ \/\ \2\3\0\k\V\ \/\ \1\3\2\k\V\ \/\ \3\3\k\V\"\
\ \ \ \ \}\,\
\ \ \ \ \{\
\ \ \ \ \ \ \"\v\a\l\u\e\"\:\ \"\3\6\0\ \M\W\"\,\
\ \ \ \ \ \ \"\l\a\b\e\l\"\:\ \"\P\o\w\e\r\ \P\l\a\n\t\ \C\i\v\i\l\ \W\o\r\k\s\"\,\
\ \ \ \ \ \ \"\s\u\b\"\:\ \"\C\o\m\b\i\n\e\d\ \C\y\c\l\e\ \&\ \H\e\a\v\y\ \I\n\d\u\s\t\r\i\a\l\"\
\ \ \ \ \}\,\
\ \ \ \ \{\
\ \ \ \ \ \ \"\v\a\l\u\e\"\:\ \"\1\0\0\,\0\0\0\+\"\,\
\ \ \ \ \ \ \"\l\a\b\e\l\"\:\ \"\P\c\s\ \P\r\e\c\a\s\t\ \C\a\b\l\e\ \S\l\a\b\s\"\,\
\ \ \ \ \ \ \"\s\u\b\"\:\ \"\U\n\d\e\r\g\r\o\u\n\d\ \T\r\a\n\s\m\i\s\s\i\o\n\ \S\a\f\e\t\y\"\
\ \ \ \ \}\,\
\ \ \ \ \{\
\ \ \ \ \ \ \"\v\a\l\u\e\"\:\ \"\1\0\0\%\"\,\
\ \ \ \ \ \ \"\l\a\b\e\l\"\:\ \"\E\H\S\ \C\o\m\p\l\i\a\n\c\e\ \T\r\a\c\k\ \R\e\c\o\r\d\"\,\
\ \ \ \ \ \ \"\s\u\b\"\:\ \"\Z\e\r\o\-\L\o\s\s\-\T\i\m\e\ \I\n\c\i\d\e\n\t\ \M\a\n\d\a\t\e\"\
\ \ \ \ \}\
\ \ \]\,\
\ \ \"\s\e\r\v\i\c\e\s\"\:\ \[\
\ \ \ \ \{\
\ \ \ \ \ \ \"\i\d\"\:\ \"\p\o\w\e\r\"\,\
\ \ \ \ \ \ \"\t\i\t\l\e\"\:\ \"\1\3\2\/\3\3\k\V\ \S\u\b\s\t\a\t\i\o\n\s\ \&\ \C\a\b\l\e\ \L\a\y\i\n\g\"\,\
\ \ \ \ \ \ \"\d\e\s\c\"\:\ \"\T\u\r\n\k\e\y\ \t\r\a\n\s\m\i\s\s\i\o\n\ \g\r\i\d\ \s\u\b\s\t\a\t\i\o\n\s\,\ \G\I\S\/\A\I\S\ \i\n\s\t\a\l\l\a\t\i\o\n\s\,\ \h\i\g\h\-\v\o\l\t\a\g\e\ \u\n\d\e\r\g\r\o\u\n\d\ \c\a\b\l\e\ \t\r\e\n\c\h\i\n\g\,\ \j\o\i\n\t\i\n\g\,\ \a\n\d\ \p\r\e\c\a\s\t\ \p\r\o\t\e\c\t\i\o\n\ \s\l\a\b\s\.\"\,\
\ \ \ \ \ \ \"\i\c\o\n\"\:\ \"\f\a\-\b\o\l\t\-\l\i\g\h\t\n\i\n\g\"\,\
\ \ \ \ \ \ \"\b\a\d\g\e\"\:\ \"\H\i\g\h\ \V\o\l\t\a\g\e\"\
\ \ \ \ \}\,\
\ \ \ \ \{\
\ \ \ \ \ \ \"\i\d\"\:\ \"\c\i\v\i\l\"\,\
\ \ \ \ \ \ \"\t\i\t\l\e\"\:\ \"\H\e\a\v\y\ \C\i\v\i\l\ \I\n\f\r\a\s\t\r\u\c\t\u\r\e\ \&\ \F\o\u\n\d\a\t\i\o\n\s\"\,\
\ \ \ \ \ \ \"\d\e\s\c\"\:\ \"\D\e\e\p\ \p\i\l\e\ \f\o\u\n\d\a\t\i\o\n\s\,\ \h\e\a\v\y\ \e\q\u\i\p\m\e\n\t\ \m\a\c\h\i\n\e\ \f\o\u\n\d\a\t\i\o\n\s\,\ \w\a\t\e\r\ \r\e\s\e\r\v\o\i\r\s\,\ \d\r\a\i\n\a\g\e\ \r\e\t\a\i\n\i\n\g\ \s\t\r\u\c\t\u\r\e\s\,\ \a\n\d\ \n\a\t\i\o\n\a\l\ \b\r\i\d\g\e\ \a\u\x\i\l\i\a\r\y\ \c\i\v\i\l\ \w\o\r\k\s\.\"\,\
\ \ \ \ \ \ \"\i\c\o\n\"\:\ \"\f\a\-\t\r\o\w\e\l\-\b\r\i\c\k\s\"\,\
\ \ \ \ \ \ \"\b\a\d\g\e\"\:\ \"\H\e\a\v\y\ \C\i\v\i\l\"\
\ \ \ \ \}\,\
\ \ \ \ \{\
\ \ \ \ \ \ \"\i\d\"\:\ \"\m\e\p\"\,\
\ \ \ \ \ \ \"\t\i\t\l\e\"\:\ \"\E\l\e\c\t\r\o\-\M\e\c\h\a\n\i\c\a\l\ \(\M\E\P\)\ \&\ \I\n\t\e\r\i\o\r\"\,\
\ \ \ \ \ \ \"\d\e\s\c\"\:\ \"\I\n\d\u\s\t\r\i\a\l\ \H\V\A\C\ \v\e\n\t\i\l\a\t\i\o\n\,\ \e\l\e\c\t\r\i\c\a\l\ \b\u\s\b\a\r\ \t\r\u\n\k\i\n\g\,\ \e\m\e\r\g\e\n\c\y\ \p\o\w\e\r\ \g\e\n\e\r\a\t\i\o\n\ \s\y\n\c\h\r\o\n\i\z\a\t\i\o\n\,\ \f\i\r\e\ \h\y\d\r\a\n\t\ \p\r\o\t\e\c\t\i\o\n\,\ \a\n\d\ \c\o\r\p\o\r\a\t\e\ \f\i\t\-\o\u\t\s\.\"\,\
\ \ \ \ \ \ \"\i\c\o\n\"\:\ \"\f\a\-\g\e\a\r\s\"\,\
\ \ \ \ \ \ \"\b\a\d\g\e\"\:\ \"\I\n\d\u\s\t\r\i\a\l\ \M\E\P\"\
\ \ \ \ \}\,\
\ \ \ \ \{\
\ \ \ \ \ \ \"\i\d\"\:\ \"\i\n\d\u\s\t\r\i\a\l\"\,\
\ \ \ \ \ \ \"\t\i\t\l\e\"\:\ \"\P\r\e\-\E\n\g\i\n\e\e\r\e\d\ \S\t\e\e\l\ \B\u\i\l\d\i\n\g\s\ \(\P\E\B\)\"\,\
\ \ \ \ \ \ \"\d\e\s\c\"\:\ \"\H\e\a\v\y\ \s\t\r\u\c\t\u\r\a\l\ \s\t\e\e\l\ \f\a\b\r\i\c\a\t\i\o\n\,\ \i\n\d\u\s\t\r\i\a\l\ \m\u\l\t\i\-\s\t\o\r\y\ \f\a\c\t\o\r\i\e\s\,\ \l\o\g\i\s\t\i\c\s\ \w\a\r\e\h\o\u\s\e\s\,\ \a\n\d\ \l\a\r\g\e\-\s\p\a\n\ \c\o\v\e\r\e\d\ \w\a\r\e\h\o\u\s\e\s\ \b\u\i\l\t\ \t\o\ \i\n\t\e\r\n\a\t\i\o\n\a\l\ \A\S\T\M\ \s\t\a\n\d\a\r\d\s\.\"\,\
\ \ \ \ \ \ \"\i\c\o\n\"\:\ \"\f\a\-\i\n\d\u\s\t\r\y\"\,\
\ \ \ \ \ \ \"\b\a\d\g\e\"\:\ \"\P\E\B\ \S\t\e\e\l\"\
\ \ \ \ \}\
\ \ \]\,\
\ \ \"\p\r\o\j\e\c\t\s\"\:\ \[\
\ \ \ \ \{\
\ \ \ \ \ \ \"\i\d\"\:\ \1\,\
\ \ \ \ \ \ \"\t\i\t\l\e\"\:\ \"\4\0\0\/\2\3\0\/\1\3\2\k\V\ \G\I\S\ \G\r\i\d\ \S\u\b\s\t\a\t\i\o\n\ \P\r\o\j\e\c\t\"\,\
\ \ \ \ \ \ \"\c\l\i\e\n\t\"\:\ \"\P\o\w\e\r\ \G\r\i\d\ \C\o\m\p\a\n\y\ \o\f\ \B\a\n\g\l\a\d\e\s\h\ \(\P\G\C\B\)\"\,\
\ \ \ \ \ \ \"\c\a\t\e\g\o\r\y\"\:\ \"\S\u\b\s\t\a\t\i\o\n\s\"\,\
\ \ \ \ \ \ \"\l\o\c\a\t\i\o\n\"\:\ \"\D\h\a\k\a\ \R\e\g\i\o\n\"\,\
\ \ \ \ \ \ \"\v\a\l\u\e\"\:\ \"\T\u\r\n\k\e\y\ \E\P\C\ \S\u\b\c\o\n\t\r\a\c\t\"\,\
\ \ \ \ \ \ \"\i\m\g\"\:\ \"\a\s\s\e\t\s\/\i\m\a\g\e\s\/\p\r\o\j\e\c\t\-\b\h\u\l\t\a\-\4\0\0\k\v\.\j\p\g\"\,\
\ \ \ \ \ \ \"\s\c\o\p\e\"\:\ \"\C\i\v\i\l\ \f\o\u\n\d\a\t\i\o\n\s\,\ \c\o\n\t\r\o\l\ \b\u\i\l\d\i\n\g\ \c\o\n\s\t\r\u\c\t\i\o\n\,\ \G\I\S\ \e\q\u\i\p\m\e\n\t\ \e\r\e\c\t\i\o\n\,\ \t\r\a\n\s\f\o\r\m\e\r\ \b\a\y\ \e\a\r\t\h\i\n\g\,\ \a\n\d\ \d\r\a\i\n\a\g\e\ \i\n\f\r\a\s\t\r\u\c\t\u\r\e\.\"\
\ \ \ \ \}\,\
\ \ \ \ \{\
\ \ \ \ \ \ \"\i\d\"\:\ \2\,\
\ \ \ \ \ \ \"\t\i\t\l\e\"\:\ \"\3\6\0\ \M\W\ \C\o\m\b\i\n\e\d\ \C\y\c\l\e\ \P\o\w\e\r\ \P\l\a\n\t\ \F\o\u\n\d\a\t\i\o\n\s\"\,\
\ \ \ \ \ \ \"\c\l\i\e\n\t\"\:\ \"\H\a\r\i\p\u\r\ \/\ \S\t\r\a\t\e\g\i\c\ \C\o\n\s\o\r\t\i\u\m\ \P\a\r\t\n\e\r\"\,\
\ \ \ \ \ \ \"\c\a\t\e\g\o\r\y\"\:\ \"\P\o\w\e\r\ \P\l\a\n\t\s\"\,\
\ \ \ \ \ \ \"\l\o\c\a\t\i\o\n\"\:\ \"\N\a\r\a\y\a\n\g\a\n\j\"\,\
\ \ \ \ \ \ \"\v\a\l\u\e\"\:\ \"\M\a\j\o\r\ \C\i\v\i\l\ \W\o\r\k\s\"\,\
\ \ \ \ \ \ \"\i\m\g\"\:\ \"\a\s\s\e\t\s\/\i\m\a\g\e\s\/\p\r\o\j\e\c\t\-\b\h\e\r\a\m\a\r\a\-\3\6\0\m\w\.\j\p\g\"\,\
\ \ \ \ \ \ \"\s\c\o\p\e\"\:\ \"\H\e\a\v\y\ \m\a\c\h\i\n\e\r\y\ \f\o\u\n\d\a\t\i\o\n\s\,\ \d\y\n\a\m\i\c\ \l\o\a\d\ \v\i\b\r\a\t\i\o\n\ \a\b\s\o\r\p\t\i\o\n\ \p\i\t\s\,\ \c\i\r\c\u\l\a\t\i\n\g\ \c\o\o\l\i\n\g\ \w\a\t\e\r\ \t\r\e\n\c\h\e\s\,\ \a\n\d\ \a\u\x\i\l\i\a\r\y\ \s\t\e\e\l\ \s\t\r\u\c\t\u\r\a\l\ \f\r\a\m\i\n\g\.\"\
\ \ \ \ \}\,\
\ \ \ \ \{\
\ \ \ \ \ \ \"\i\d\"\:\ \3\,\
\ \ \ \ \ \ \"\t\i\t\l\e\"\:\ \"\1\3\2\k\V\ \U\n\d\e\r\g\r\o\u\n\d\ \T\r\a\n\s\m\i\s\s\i\o\n\ \C\a\b\l\e\ \R\o\u\t\e\ \P\r\o\t\e\c\t\i\o\n\"\,\
\ \ \ \ \ \ \"\c\l\i\e\n\t\"\:\ \"\D\h\a\k\a\ \P\o\w\e\r\ \D\i\s\t\r\i\b\u\t\i\o\n\ \C\o\m\p\a\n\y\ \(\D\P\D\C\)\"\,\
\ \ \ \ \ \ \"\c\a\t\e\g\o\r\y\"\:\ \"\T\r\a\n\s\m\i\s\s\i\o\n\"\,\
\ \ \ \ \ \ \"\l\o\c\a\t\i\o\n\"\:\ \"\M\e\t\r\o\p\o\l\i\t\a\n\ \D\h\a\k\a\"\,\
\ \ \ \ \ \ \"\v\a\l\u\e\"\:\ \"\S\a\f\e\t\y\ \&\ \T\r\e\n\c\h\i\n\g\ \C\o\n\t\r\a\c\t\"\,\
\ \ \ \ \ \ \"\i\m\g\"\:\ \"\a\s\s\e\t\s\/\i\m\a\g\e\s\/\p\r\o\j\e\c\t\-\c\a\b\l\e\-\s\l\a\b\.\j\p\g\"\,\
\ \ \ \ \ \ \"\s\c\o\p\e\"\:\ \"\T\r\e\n\c\h\ \e\x\c\a\v\a\t\i\o\n\ \i\n\ \d\e\n\s\e\ \u\r\b\a\n\ \c\o\r\r\i\d\o\r\s\,\ \R\C\C\ \d\u\c\t\ \b\a\n\k\ \p\l\a\c\e\m\e\n\t\,\ \a\n\d\ \i\n\s\t\a\l\l\a\t\i\o\n\ \o\f\ \1\0\0\,\0\0\0\+\ \p\c\s\ \p\r\o\p\r\i\e\t\a\r\y\ \p\r\e\c\a\s\t\ \i\n\t\e\r\l\o\c\k\i\n\g\ \p\r\o\t\e\c\t\i\o\n\ \s\l\a\b\s\.\"\
\ \ \ \ \}\,\
\ \ \ \ \{\
\ \ \ \ \ \ \"\i\d\"\:\ \4\,\
\ \ \ \ \ \ \"\t\i\t\l\e\"\:\ \"\H\e\a\v\y\ \I\n\d\u\s\t\r\i\a\l\ \P\r\e\-\E\n\g\i\n\e\e\r\e\d\ \S\t\e\e\l\ \M\a\n\u\f\a\c\t\u\r\i\n\g\ \F\a\c\i\l\i\t\y\"\,\
\ \ \ \ \ \ \"\c\l\i\e\n\t\"\:\ \"\P\r\e\m\i\e\r\ \I\n\d\u\s\t\r\i\a\l\ \G\r\o\u\p\"\,\
\ \ \ \ \ \ \"\c\a\t\e\g\o\r\y\"\:\ \"\P\E\B\ \S\t\e\e\l\"\,\
\ \ \ \ \ \ \"\l\o\c\a\t\i\o\n\"\:\ \"\G\a\z\i\p\u\r\ \I\n\d\u\s\t\r\i\a\l\ \Z\o\n\e\"\,\
\ \ \ \ \ \ \"\v\a\l\u\e\"\:\ \"\F\u\l\l\ \P\E\B\ \T\u\r\n\k\e\y\"\,\
\ \ \ \ \ \ \"\i\m\g\"\:\ \"\a\s\s\e\t\s\/\i\m\a\g\e\s\/\p\r\o\j\e\c\t\-\s\i\t\e\-\w\o\r\k\.\j\p\g\"\,\
\ \ \ \ \ \ \"\s\c\o\p\e\"\:\ \"\C\l\e\a\r\-\s\p\a\n\ \P\E\B\ \s\t\e\e\l\ \b\u\i\l\d\i\n\g\ \d\e\s\i\g\n\,\ \f\a\b\r\i\c\a\t\i\o\n\,\ \o\n\-\s\i\t\e\ \e\r\e\c\t\i\o\n\,\ \h\e\a\v\y\ \o\v\e\r\h\e\a\d\ \c\r\a\n\e\ \g\i\r\d\e\r\ \i\n\s\t\a\l\l\a\t\i\o\n\,\ \a\n\d\ \h\i\g\h\-\s\p\e\c\ \i\n\d\u\s\t\r\i\a\l\ \f\l\o\o\r\i\n\g\.\"\
\ \ \ \ \}\
\ \ \]\,\
\ \ \"\s\i\s\t\e\r\C\o\n\c\e\r\n\"\:\ \{\
\ \ \ \ \"\n\a\m\e\"\:\ \"\S\w\a\d\e\s\h\ \C\a\r\r\y\i\n\g\ \A\g\e\n\c\y\"\,\
\ \ \ \ \"\s\u\b\t\i\t\l\e\"\:\ \"\H\e\a\v\y\ \H\a\u\l\a\g\e\,\ \S\p\e\c\i\a\l\i\z\e\d\ \H\y\d\r\a\u\l\i\c\ \M\u\l\t\i\-\A\x\l\e\ \F\l\e\e\t\ \&\ \I\n\l\a\n\d\ \R\i\v\e\r\ \L\o\g\i\s\t\i\c\s\"\,\
\ \ \ \ \"\s\t\a\t\F\l\e\e\t\"\:\ \"\2\5\+\ \S\p\e\c\i\a\l\i\z\e\d\ \V\e\h\i\c\l\e\s\"\,\
\ \ \ \ \"\s\t\a\t\C\a\p\a\c\i\t\y\"\:\ \"\U\p\ \t\o\ \3\0\0\ \T\o\n\s\ \P\e\r\ \M\o\v\e\"\,\
\ \ \ \ \"\d\e\s\c\"\:\ \"\O\p\e\r\a\t\i\n\g\ \a\s\ \V\i\s\i\o\n\T\e\c\h\'\s\ \i\n\t\e\g\r\a\t\e\d\ \l\o\g\i\s\t\i\c\s\ \b\a\c\k\b\o\n\e\,\ \S\w\a\d\e\s\h\ \C\a\r\r\y\i\n\g\ \A\g\e\n\c\y\ \g\u\a\r\a\n\t\e\e\s\ \s\e\l\f\-\r\e\l\i\a\n\t\ \t\r\a\n\s\p\o\r\t\ \o\f\ \h\e\a\v\y\ \p\o\w\e\r\ \t\r\a\n\s\f\o\r\m\e\r\s\,\ \t\u\r\b\i\n\e\s\,\ \a\n\d\ \o\v\e\r\s\i\z\e\d\ \c\o\n\s\t\r\u\c\t\i\o\n\ \c\a\r\g\o\ \a\c\r\o\s\s\ \a\l\l\ \n\a\t\i\o\n\a\l\ \h\i\g\h\w\a\y\s\ \a\n\d\ \r\i\v\e\r\ \w\a\t\e\r\w\a\y\s\ \i\n\ \B\a\n\g\l\a\d\e\s\h\.\"\
\ \ \}\,\
\ \ \"\i\n\v\e\s\t\o\r\s\"\:\ \{\
\ \ \ \ \"\h\e\a\d\l\i\n\e\"\:\ \"\S\t\r\a\t\e\g\i\c\ \I\n\v\e\s\t\m\e\n\t\ \P\r\o\p\o\s\a\l\:\ \P\o\w\e\r\,\ \L\o\g\i\s\t\i\c\s\ \&\ \T\u\r\n\k\e\y\ \I\n\f\r\a\s\t\r\u\c\t\u\r\e\"\,\
\ \ \ \ \"\t\a\r\g\e\t\C\a\p\i\t\a\l\"\:\ \"\\$\5\,\0\0\0\,\0\0\0\ \U\S\D\"\,\
\ \ \ \ \"\p\r\o\j\e\c\t\e\d\R\o\i\"\:\ \"\2\2\%\ \-\ \2\8\%\ \I\R\R\"\,\
\ \ \ \ \"\s\t\a\t\u\s\"\:\ \"\A\c\t\i\v\e\ \C\a\p\i\t\a\l\ \R\o\u\n\d\ \O\p\e\n\ \f\o\r\ \A\c\c\r\e\d\i\t\e\d\ \S\t\r\a\t\e\g\i\c\ \P\a\r\t\n\e\r\s\"\
\ \ \}\,\
\ \ \"\m\e\d\i\a\S\e\c\t\i\o\n\"\:\ \{\
\ \ \ \ \"\h\e\a\d\l\i\n\e\"\:\ \"\P\u\b\l\i\c\a\t\i\o\n\s\,\ \B\r\o\c\h\u\r\e\s\ \&\ \S\i\t\e\ \G\a\l\l\e\r\y\"\,\
\ \ \ \ \"\l\e\a\d\T\e\x\t\"\:\ \"\D\o\w\n\l\o\a\d\ \o\f\f\i\c\i\a\l\ \E\P\C\ \p\r\e\-\q\u\a\l\i\f\i\c\a\t\i\o\n\ \d\o\s\s\i\e\r\s\,\ \e\q\u\i\p\m\e\n\t\ \s\p\e\c\i\f\i\c\a\t\i\o\n\s\,\ \a\n\d\ \i\n\s\p\e\c\t\ \o\u\r\ \a\c\t\i\v\e\ \h\i\g\h\-\v\o\l\t\a\g\e\ \s\u\b\s\t\a\t\i\o\n\ \p\r\o\j\e\c\t\ \g\a\l\l\e\r\y\.\"\,\
\ \ \ \ \"\b\r\o\c\h\u\r\e\s\"\:\ \[\
\ \ \ \ \ \ \{\
\ \ \ \ \ \ \ \ \"\i\d\"\:\ \1\,\
\ \ \ \ \ \ \ \ \"\t\i\t\l\e\"\:\ \"\C\o\r\p\o\r\a\t\e\ \F\a\c\t\ \S\h\e\e\t\ \&\ \P\r\o\f\i\l\e\"\,\
\ \ \ \ \ \ \ \ \"\s\i\z\e\"\:\ \"\P\D\F\ \\\\\u\2\0\2\2\ \2\.\4\ \M\B\"\,\
\ \ \ \ \ \ \ \ \"\d\e\s\c\"\:\ \"\O\f\f\i\c\i\a\l\ \e\n\g\i\n\e\e\r\i\n\g\ \c\r\e\d\e\n\t\i\a\l\s\,\ \m\a\n\a\g\e\m\e\n\t\ \p\r\o\f\i\l\e\,\ \b\a\n\k\ \s\o\l\v\e\n\c\y\ \c\e\r\t\i\f\i\c\a\t\e\s\,\ \a\n\d\ \c\o\m\p\a\n\y\ \r\e\g\i\s\t\r\y\.\"\,\
\ \ \ \ \ \ \ \ \"\f\i\l\e\U\r\l\"\:\ \"\a\s\s\e\t\s\/\d\o\c\s\/\V\i\s\i\o\n\T\e\c\h\-\C\o\r\p\o\r\a\t\e\-\P\r\o\f\i\l\e\.\p\d\f\"\
\ \ \ \ \ \ \}\,\
\ \ \ \ \ \ \{\
\ \ \ \ \ \ \ \ \"\i\d\"\:\ \2\,\
\ \ \ \ \ \ \ \ \"\t\i\t\l\e\"\:\ \"\E\P\C\ \T\u\r\n\k\e\y\ \C\a\p\a\b\i\l\i\t\i\e\s\ \D\e\c\k\"\,\
\ \ \ \ \ \ \ \ \"\s\i\z\e\"\:\ \"\P\D\F\ \\\\\u\2\0\2\2\ \4\.\1\ \M\B\"\,\
\ \ \ \ \ \ \ \ \"\d\e\s\c\"\:\ \"\1\3\2\/\3\3\k\V\ \s\u\b\s\t\a\t\i\o\n\s\,\ \u\n\d\e\r\g\r\o\u\n\d\ \t\r\a\n\s\m\i\s\s\i\o\n\ \c\a\b\l\e\ \l\a\y\i\n\g\ \m\e\t\h\o\d\s\,\ \a\n\d\ \c\i\v\i\l\ \c\o\n\s\t\r\u\c\t\i\o\n\ \m\a\c\h\i\n\e\r\y\.\"\,\
\ \ \ \ \ \ \ \ \"\f\i\l\e\U\r\l\"\:\ \"\a\s\s\e\t\s\/\d\o\c\s\/\V\i\s\i\o\n\T\e\c\h\-\E\P\C\-\C\a\p\a\b\i\l\i\t\i\e\s\.\p\d\f\"\
\ \ \ \ \ \ \}\,\
\ \ \ \ \ \ \{\
\ \ \ \ \ \ \ \ \"\i\d\"\:\ \3\,\
\ \ \ \ \ \ \ \ \"\t\i\t\l\e\"\:\ \"\S\w\a\d\e\s\h\ \C\a\r\r\y\i\n\g\ \L\o\g\i\s\t\i\c\s\ \D\e\c\k\"\,\
\ \ \ \ \ \ \ \ \"\s\i\z\e\"\:\ \"\P\D\F\ \\\\\u\2\0\2\2\ \1\.\8\ \M\B\"\,\
\ \ \ \ \ \ \ \ \"\d\e\s\c\"\:\ \"\S\p\e\c\i\a\l\i\z\e\d\ \m\u\l\t\i\-\a\x\l\e\ \t\r\a\i\l\e\r\ \f\l\e\e\t\,\ \r\i\v\e\r\ \b\a\r\g\e\ \c\h\a\r\t\e\r\s\,\ \a\n\d\ \h\e\a\v\y\ \c\a\r\g\o\ \t\r\a\n\s\i\t\ \i\n\s\u\r\a\n\c\e\ \p\o\l\i\c\i\e\s\.\"\,\
\ \ \ \ \ \ \ \ \"\f\i\l\e\U\r\l\"\:\ \"\a\s\s\e\t\s\/\d\o\c\s\/\S\w\a\d\e\s\h\-\L\o\g\i\s\t\i\c\s\-\B\r\o\c\h\u\r\e\.\p\d\f\"\
\ \ \ \ \ \ \}\
\ \ \ \ \]\,\
\ \ \ \ \"\g\a\l\l\e\r\y\"\:\ \[\
\ \ \ \ \ \ \{\
\ \ \ \ \ \ \ \ \"\t\i\t\l\e\"\:\ \"\B\h\u\l\t\a\ \4\0\0\k\V\ \S\u\b\s\t\a\t\i\o\n\ \E\a\r\t\h\w\o\r\k\"\,\
\ \ \ \ \ \ \ \ \"\i\m\g\"\:\ \"\a\s\s\e\t\s\/\i\m\a\g\e\s\/\p\r\o\j\e\c\t\-\b\h\u\l\t\a\-\4\0\0\k\v\.\j\p\g\"\
\ \ \ \ \ \ \}\,\
\ \ \ \ \ \ \{\
\ \ \ \ \ \ \ \ \"\t\i\t\l\e\"\:\ \"\B\h\e\r\a\m\a\r\a\ \3\6\0\M\W\ \T\u\r\b\i\n\e\ \F\o\u\n\d\a\t\i\o\n\"\,\
\ \ \ \ \ \ \ \ \"\i\m\g\"\:\ \"\a\s\s\e\t\s\/\i\m\a\g\e\s\/\p\r\o\j\e\c\t\-\b\h\e\r\a\m\a\r\a\-\3\6\0\m\w\.\j\p\g\"\
\ \ \ \ \ \ \}\,\
\ \ \ \ \ \ \{\
\ \ \ \ \ \ \ \ \"\t\i\t\l\e\"\:\ \"\H\i\g\h\ \V\o\l\t\a\g\e\ \C\a\b\l\e\ \P\r\o\t\e\c\t\i\o\n\ \S\l\a\b\s\"\,\
\ \ \ \ \ \ \ \ \"\i\m\g\"\:\ \"\a\s\s\e\t\s\/\i\m\a\g\e\s\/\p\r\o\j\e\c\t\-\c\a\b\l\e\-\s\l\a\b\.\j\p\g\"\
\ \ \ \ \ \ \}\,\
\ \ \ \ \ \ \{\
\ \ \ \ \ \ \ \ \"\t\i\t\l\e\"\:\ \"\M\a\d\u\n\a\g\h\a\t\ \S\w\i\t\c\h\g\e\a\r\ \E\r\e\c\t\i\o\n\"\,\
\ \ \ \ \ \ \ \ \"\i\m\g\"\:\ \"\a\s\s\e\t\s\/\i\m\a\g\e\s\/\p\r\o\j\e\c\t\-\m\a\d\u\n\a\g\h\a\t\.\j\p\g\"\
\ \ \ \ \ \ \}\,\
\ \ \ \ \ \ \{\
\ \ \ \ \ \ \ \ \"\t\i\t\l\e\"\:\ \"\M\a\i\j\d\e\e\ \G\I\S\ \C\o\n\t\r\o\l\ \C\e\n\t\e\r\"\,\
\ \ \ \ \ \ \ \ \"\i\m\g\"\:\ \"\a\s\s\e\t\s\/\i\m\a\g\e\s\/\p\r\o\j\e\c\t\-\m\a\i\j\d\e\e\-\g\i\s\.\j\p\g\"\
\ \ \ \ \ \ \}\,\
\ \ \ \ \ \ \{\
\ \ \ \ \ \ \ \ \"\t\i\t\l\e\"\:\ \"\P\u\r\b\a\s\a\d\i\p\u\r\ \T\r\a\n\s\f\o\r\m\e\r\ \R\i\g\g\i\n\g\"\,\
\ \ \ \ \ \ \ \ \"\i\m\g\"\:\ \"\a\s\s\e\t\s\/\i\m\a\g\e\s\/\p\r\o\j\e\c\t\-\p\u\r\b\a\s\a\d\i\p\u\r\.\j\p\g\"\
\ \ \ \ \ \ \}\
\ \ \ \ \]\
\ \ \}\,\
\ \ \"\a\d\m\i\n\A\u\t\h\"\:\ \{\
\ \ \ \ \"\u\s\e\r\n\a\m\e\"\:\ \"\a\d\m\i\n\"\,\
\ \ \ \ \"\p\a\s\s\w\o\r\d\H\a\s\h\"\:\ \"\"\
\ \ \}\
\}\);

export async function onRequestGet(context) {
  try {
    if (context.env && context.env.SITE_DATA_KV) {
      const stored = await context.env.SITE_DATA_KV.get('siteData');
      if (stored) {
        return new Response(stored, {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Cache-Control': 'no-store, no-cache, must-revalidate'
          }
        });
      }
    }
  } catch (e) {}

  return new Response(JSON.stringify(SEED_DATA), {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'no-store, no-cache, must-revalidate'
    }
  });
}

export async function onRequestPost(context) {
  const authHeader = context.request.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    });
  }

  try {
    const newContent = await context.request.json();
    const str = JSON.stringify(newContent);
    if (context.env && context.env.SITE_DATA_KV) {
      await context.env.SITE_DATA_KV.put('siteData', str);
    }
    return new Response(JSON.stringify({
      success: true,
      message: 'Cloudflare Content Synchronized and Persisted in KV!'
    }), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    });
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    }
  });
}
