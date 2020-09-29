// https://github.com/vercel/next.js/blob/506116c7d03aa7ca1acae68579b64894eb598ee1/examples/with-google-analytics/lib/gtag.js
export const GA_TRACKING_ID = 'UA-179266479-1'

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url) => {
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  })
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }) => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value,
  })
}
