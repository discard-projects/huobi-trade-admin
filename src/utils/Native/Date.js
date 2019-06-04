Date.current = function () {
  return new Date()
}
Object.defineProperties(Date.prototype, {
  msec: { get () { return this.getMilliseconds() } },
  sec: { get () { return this.getSeconds() } },
  min: { get () { return this.getMinutes() } },
  hour: { get () { return this.getHours() } },
  hour12: { get () { return this.hour % 12 > 0 ? this.hour % 12 : 12 } },
  wday: { get () { return this.getDay() } },
  wdayName: { get () { return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][this.getDay()] } },
  wdayAbbr: { get () { return ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'][this.getDay()] } },
  day: { get () { return this.getDate() } },
  mday: { get () { return this.day } },
  yday: { get () { return Math.ceil((this - new Date(this.getFullYear(),0,1)) / 86400000) } },
  month: { get () { return this.getMonth() + 1 } },
  monthName: { get () { return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][this.getMonth()] } },
  monthAbbr: { get () { return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][this.getMonth()] } },
  year: { get () { return this.getFullYear() } },
  isLeapYear: {
    get () {
      let yr = this.year
      if (parseInt(yr) % 4 === 0 && parseInt(yr) % 100 !== 0 || parseInt(yr) % 400 === 0) {
        return true
      }
      return false
    }
  }
})

Date.prototype.strftime = function (dateFormat = '%Y-%M-%d %H:%m:%s') {
  return dateFormat
  // 2018
    .replace(/%?Y+/, () => this.year)
    // (00..99)
    .replace(/%?y+/, () => `${this.year}`.substring(2, 4))
    // (1..12)
    .replace(/%?(_M)+/, () => this.month)
    // (01..12)
    .replace(/%?M+/, () => this.month < 10 ? `0${this.month}` : this.month)
    // January, February ..
    .replace(/%?B+/, () => this.monthName)
    // Jan, Feb ...
    .replace(/%?b+/, () => this.monthAbbr)
    // (1..31)
    .replace(/%?(_d)+/, () => this.day)
    // (01..31)
    .replace(/%?d+/, () => this.day < 10 ? `0${this.day}` : this.day)
    // (0..23)
    .replace(/%?(_H)+/, () => this.hour)
    // (00..23)
    .replace(/%?H+/, () => this.hour < 10 ? `0${this.hour}` : this.hour)
    // (0..12)
    .replace(/%?(_h)+/, () => this.hour12)
    // (00..12)
    .replace(/%?h+/, () => this.hour12 < 10 ? `0${this.hour12}` : this.hour12)
    // (0..59)
    .replace(/%?(_m)+/, () => this.min)
    // (00..59)
    .replace(/%?m+/, () => this.min < 10 ? `0${this.min}` : this.min)
    // (0..59)
    .replace(/%?(_s)+/, () => this.sec)
    // (00..59)
    .replace(/%?s+/, () => this.sec < 10 ? `0${this.sec}` : this.sec)
    // PM, AM
    .replace(/%?P+/, () => this.hour > 12 ? 'PM' : 'AM')
    // pm, am
    .replace(/%?p+/, () => this.hour > 12 ? 'pm' : 'am')
    // ms
    .replace(/%?L+/, () => this.msec)
    // Sunday, Monday...
    .replace(/%?A+/, () => this.wdayName)
    // Sun, Mon...
    .replace(/%?a+/, () => this.wdayAbbr)
    // (1..7)
    .replace(/%?u+/, () => this.wday + 1)
    // (0..6)
    .replace(/%?w+/, () => this.wday)
}
