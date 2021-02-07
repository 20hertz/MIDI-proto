## MIDI browser support
MIDI doesn't work on all browsers.  See [Caniuse](https://caniuse.com/midi) for browser support.  No Safari nor FireFox up until now.


## Getting started
Install dependencies:
```
yarn
```

To run the dev server:
```
yarn start
```

## TODO

### Sample model

Direct download link equivalent: https://drive.google.com/uc?export=download&id=FILE_ID
e.g. curl -L -o mouth_hihat.mp3 "https://drive.google.com/uc?export=download&id=1znjQcqgcYE2-aoxYf8pWpsbqBHALKqBn"

SHAREABLE_LINK=https://drive.google.com/file/d/10ZKzj_ihTSxDvnk-Yt9QE61vaD-q4d-v/view
curl -L -o zip.zip https://drive.google.com/uc\?id\=$(echo $SHAREABLE_LINK | cut -f6 -d"/")