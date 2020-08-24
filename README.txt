データについての説明
1:--srcフォルダについて--

src以下にはsassやwebpackが含まれているため、開発用のデータのみ入っています。
開発データがいらない場合は抜いてもらって結構です。

中身はgulpやwebpackなどです。

npm installでgulpとwebpackのpackageが読み込まれます。

gulpコマンドでgulpタスクが動き、npm run watchでwebpackがapp.jsをbundle.jsに自動コンパイルします。


2:注意点 jsファイルについて

htmlで読み込んでいるbundle.jsですが、jQuery3.X利用のため、wordpressのデフォルトの1.Xのだとバッティングするかもです。

今回利用してるjsプラグインはvivus.jsとAOS.js、jQueryで、これらは全てbundle.jsにすでに含まれています。

不具合あればお知らせください。