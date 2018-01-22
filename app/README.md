# qqd

> a app

## Build Setup ## 
## 方法使用##

- [文章详情页render方法](#renderrelativenews)
- [视频详情页render方法](#renderrelativevideo)
- [更多评论](#relativedetails)
- [相关推荐](#morecommands)

## 页面渲染初始化的方法名## 
### `renderRelativeNews`
``` bash
文章详情页：

renderRelativeNews（obj）
方法名: renderRelativeNews
参数:  obj : json字符串
格式:
{
 commentsRespList：[],
 resourceResp:{},
 releaseRespList:[]
} 
```
### `renderRelativeVideo`
``` bash
视频详情页：
renderRelativeVideo（obj）
方法名: renderRelativeVideo
参数:  obj : json字符串
格式:
{
 commentsRespList：[],
 resourceResp:{},
 releaseRespList:[]
} 

```

# h5调用app的方法

## 相关文章 relativeDetails  
### `relativeDetails`
``` bash
relativeDetails（params）
方法名: renderRelativeNews
参数:  params   字符串 传递的是当前文章或视频的resourceID


```
## 更多评论 moreCommands
### `moreCommands`
``` bash

moreCommands（params）
方法名: moreCommands
参数:  params   字符串 传递的是当前文章或视频的resourceID


```
## 点赞

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
