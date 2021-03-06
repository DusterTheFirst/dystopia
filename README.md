# Create Your Own Dystopia - Agressive Survaliance and Social Scoring
This project is a submission to Mr. Joseph's C.Y.O.D 

## Usage
Install dependencies with yarn using `yarn`
- To run in develpment, run `yarn start`
- To run in "production", run `yarn build` to build the app and then run `yarn serve` to serve the files

> If you are in need of guidance on what you can do with the app, please check out the attached [script](SCRIPT.md) which was used
to present this project

### Setup
The react app will mimic three sites using react router:
- socialcredit.gov
- gogle.com
- shoppingsite.bruh
- bureauofthought.gov

#### Hosts
You must add all of these domains to the `/etc/hosts` or on windows `C:\Windows\System32\drivers\etc\hosts` file pointing to 127.0.0.1
in order for the mimic to work. A sample hosts file is below
```hosts
127.0.0.1 socialcredit.gov
127.0.0.1 gogle.com
127.0.0.1 shoppingsite.bruh
127.0.0.1 bureauofthought.gov
```

## Running the app
You must use a chromium based browser (webkit) to be able to use the SpeechRecognition API.
Aswell as a webkit enabled browser, you must add the 3 above sites to the you must navigate to
[chrome://flags/#unsafely-treat-insecure-origin-as-secure](chrome://flags/#unsafely-treat-insecure-origin-as-secure)
section of the flags and add the list below.
```
http://socialcredit.gov, http://gogle.com, http://shoppingsite.bruh, http://bureauofthought.gov
```

> All of these are configured in the .env for use in development

Once that is setup, you must start the state server using `yarn start-server` in a seperate command line. Once the server has started, you can now start the app
using the commands above or reload the page if the app has already been started