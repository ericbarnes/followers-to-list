# Followers to List
> When passing a user handle, create a list of the people they follow.

## Usage
Copy `config.example.json` to `config.json` and fill the values in after creating an app from [here](https://apps.twitter.com/).

```sh
$ bin/go ericlbarnes
```

This will start the script and add up to 300 people *ericlbarnes* follows to a list called `ericlbarnes-following` on your profile.

## Limitations
This only gathers the latest 20 followers they have, need to implement curser walking, and even then it still only allows up to 300 users in a 15 minute window. So if someone follows more than that, you'll be out of luck.
