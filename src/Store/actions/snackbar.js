export const snackbarSuccess = (message) => ({
  type: "SNACKBAR::SUCCESS",
  message
})


export const snackbarError = (message) => ({
  type: "SNACKBAR::ERROR",
  message
})

export const snackbarWarning = (message) => ({
  type: "SNACKBAR::WARNING",
  message
})

export const snackbarInfo = (message) => ({
  type: "SNACKBAR::INFO",
  message
})

export const closeSnackbar = () => ({
  type: "SNACKBAR::CLOSE"
})