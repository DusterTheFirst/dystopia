# Create Your Own Dystopia - Agressive Survaliance and Social Scoring
This project is a submission to Mr. Joseph's C.Y.O.D 

## Usage
Install dependencies with yarn using `yarn`
- To run in develpment, run `yarn start`
- To run in "production", run `yarn build` to build the app and then run `yarn serve -s build` to serve the files

### Setup
The react app will mimic three sites using react router:
- socialcredit.gov
- gogle.com
- shoppingsite.bruh

You must add all of these domains to an /etc/hosts file pointing to 127.0.0.1
in order for the mimic to work. A sample hosts file is below
```hosts
127.0.0.1 socialcredit.gov
127.0.0.1 gogle.com
127.0.0.1 shoppingsite.bruh
```

## Running the app
You must use a chromium based browser (webkit) to be able to use the SpeechRecognition API.
Aswell as a webkit enabled browser, you must add the 3 above sites to the you must navigate to
[chrome://flags/#unsafely-treat-insecure-origin-as-secure](chrome://flags/#unsafely-treat-insecure-origin-as-secure)
section of the flags and add the list below.
```
http://socialcredit.gov, http://gogle.com, http://shoppingsite.bruh
```