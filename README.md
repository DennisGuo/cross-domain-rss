# cross-domain-rss
Build a rss proxy with cross-domain header : `Access-Control-Allow-Origin'. And also convert xml rss to json format.

The online site is ： [http://ciyuer.com:7100](http://ciyuer.com:7100)


<img src="http://p1.bpimg.com/567571/ed83bd0b3a637b51.png" width="600" alt="the screenshot"/>

## Usage

- clone the project

```shell
git clone https://github.com/DennisGuo/cross-domain-rss.git
```

- build project

```shell
cd cross-domin-rss 
npm install
```

- run the project

```shell
node index.js
```

- The proxy server now is runing .

``` 
2017-02-01 16:26:23 | Cross-domain rss proxy running on port 4000 !
```

### Proxy the rss 
The server is very simple .

Assume that you want to proxy [http://feed.cnblogs.com/blog/sitehome/rss](http://feed.cnblogs.com/blog/sitehome/rss)   
you just need a simple http get request like below:

```
http://localhost:4000/proxy/http%3A%2F%2Ffeed.cnblogs.com%2Fblog%2Fsitehome%2Frss
```
