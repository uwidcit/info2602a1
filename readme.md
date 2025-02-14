[![Run in Postman](https://run.pstmn.io/button.svg)](https://documenter.getpostman.com/view/583570/SzRuZCp8?version=latest)

## Initializing

You can initialize your database according to the init command in wsgi.py by running the following command:

```bash
flask init
```

It is a good idea to run this after every change to models.

## Running

When opened in gitpod the server should be running already if it isn't
you can start it with the following command:

```bash
flask run
```

## Testing

1. To ensure the latest version of the test suite is downloaded, run: ```npm run update-tests```
2. Ensure Postman is setup to point to your assignment's Gitpod url as the host variable.
3. Test your application by running the requests of the Postman collection linked above and viewing the Test Results tab

![results](/img/results.png)

When all of your routes are implemented you can run the entire collection of tests.

![run 1](/img/run.png)

![run 2](/img/run2.png)

![run 3](/img/run3.png)

You should pay particular attention to the example requests and responses and the test results to ensure your application is meeting the required specification.
