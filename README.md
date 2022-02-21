# Splunk Event

## Install

```bash
npm install --save @paziresh24/splunk-event

# or

yarn add @paziresh24/splunk-event
```

## Usage

```tsx
import { splunk } from "@paziresh24/splunk-event";

const splnk = splunk.create({
    baseUrl: "https://splunk.local:8088",
    token: XXX,
    constant: { // optional
        userAgent: navigator.userAgent
    }
})

splnk.sendEvent({
    group: 'search_events',
    type: "click",
    ... // other event data
})

```
