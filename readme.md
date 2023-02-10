[![Gitpod Ready-to-Code](https://img.shields.io/badge/Gitpod-Ready--to--Code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/uwidcit/info2602a1) 

[![Run in Postman](https://run.pstmn.io/button.svg)](https://documenter.getpostman.com/view/583570/SzRuZCp8?version=latest)


# Initializing
You can initialize your database according to the init command in wsgi.py by running the following command

```
flask init
```
It is a good idea to run this after every change to models

# Running
When opened in gitpod the server should be running already if it isn't
you can start it with the following command;

```bash
flask run
```

# Testing
1. Ensure postman is setup to point to your assignment's gitpod url as the host variable.
2. Test your application by running the requests of the postman collection linked above and viewing the Test Results tab

![results](/img/results.png)

When all of you routes are implemented you can run the entire collection of tests.

![run 1](/img/run.png)

![run 2](/img/run2.png)

![run 3](/img/run3.png)

You should pay particular attention to the example requests and responses and the test results to ensure your application is meeting the required specification.
