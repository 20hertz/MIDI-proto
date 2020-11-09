# MIDI-Proto
A homemade drum machine to kill time while stuck at home.

## Browser support
MIDI doesn't work on all browsers.  See [Caniuse](https://caniuse.com/midi) for browser support.  No Safari nor FireFox up until now.

Go to https://d1xw1eegt1xgze.cloudfront.net to make some beats.

## Getting started
To run the application bundler, ou need [Parcel](https://parceljs.org/getting_started.html) installed on your system.

To run the dev server:
```
yarn start
```

## TODO
### Kit model
Probably need to create a class to represent Kit and all of its data
Ex: name, samples

Kit class needs to have the ability to store some data, retrieve it, and change it.
Also needs to have the ability to notify the rest of the app when some data is changed.

### Sample model