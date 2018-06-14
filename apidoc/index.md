
# API DOC

*** 所有的接口，返回的结果成功状态由http的状态码来标志，每个接口均会写出成功的状态码，其它的一律表示失败。***

开发环境，192.168.7.151:6200

资源列表：

此接口为网关接口，包含了两大块内容:


   RESTApi(标准接口)
     1.透传原有的REST风格接口，做智能路由。


   BusiQueryApi(业务查询)
     2.做graphQL的业务查询接口


#RESTApi:

RESTApi资源是指透传原有的REST风格接口，做智能路由，只需要在URL前面加上相应URL请求的服务名前缀.
每一个端口代表一个服务名，根据接口的端口名可以找到相应的服务名，并加上前缀即可。

具体的服务名列表如下:

     userServer:{
        port: 6003
    },

    roleServer:{
        port: 6002
    },

    accountServer:{
        port: 6000
    },

    menuServer:{
        port: 6001
    },

    merchantServer:{
        port: 6004
    },

    platformBusiServer:{
        port: 6101
    },

    authServer:{
        port: 6100
    },

    shopBusiServer:{
        port: 6102
    },

    shopServer:{
        port: 6005
    },

     addressServer:{
            port: 6501
      }

###1.举例.

http://localhost:6200/roleServer/api/v1.0.0/roles/GUu4Zz0788NughRrzYh7dw

当不传应用系统链接时，默认从JWT中获取。

**http**

get




**response**


```
{
	"href": "http://192.168.7.151:6002/api/v1.0.0/roles/GUu4Zz0788NughRrzYh7dw",
	"name": "超级管理员",
	"description": null,
	"type": "merchant",
	"status": "enabled",
	"createdAt": "2018-05-31 02:00:20",
	"modifiedAt": "2018-05-31 02:00:20",
	"application": {
		"href": "http://192.168.7.151:6000/api/v1.0.0/applications/Sad9YHDXhm9cyMeoNvr2ig"
	},
	"merchant": {
		"href": "http://192.168.7.151:6004/api/v1.0.0/merchants/0BlAQi3BXAEEEurhYkVcgA"
	},
	"permissions": {
		"href": "http://192.168.7.151:6002/api/v1.0.0/roles/GUu4Zz0788NughRrzYh7dw/permissions"
	}
}
```


