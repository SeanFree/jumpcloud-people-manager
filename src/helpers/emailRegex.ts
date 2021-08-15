// https://www.w3.org/TR/2012/WD-html-markup-20120329/input.email.html

const emailRegex = new RegExp(
  '[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+).*$'
)

export default emailRegex
