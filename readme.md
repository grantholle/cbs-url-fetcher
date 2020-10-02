# CBS Show URL Fetcher

This retrieves episode urls from CBS to use with youtube-dl.

## Usage

First, you need to get the slug of the show you're wanting to download. You can find it from the url of the show, such as https://www.cbs.com/shows/adventures-of-sonic/, where `adventures-of-sonic` is the slug.

Then you can use it in the command,

```
npm i -g https://github.com/grantholle/cbs-url-fetcher
cbs-show adventures-of-sonic
```

Here are the options for getting urls:

```
cbs-show --help

Options:
  -V, --version         output the version number
  -s, --start <season>  The starting season (default: 1)
  -e, --end <season>    The ending season
  -f --file <path>      The file path which to write the output
  -h, --help            display help for command

cbs-show macgyver-classic --start 4 --end 5 --file ~/macgyver-classic.txt
```
