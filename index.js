function* emojiGenerator() {
  let index = 0
  while(true) yield index++
}

const Spinner = require('cli-spinner').Spinner
  , emoji = require('node-emoji')
  , moonPhases = [
      emoji.get('new_moon'),
      emoji.get('new_moon_with_face'),
      emoji.get('waxing_crescent_moon'),
      emoji.get('first_quarter_moon'),
      emoji.get('moon'),
      emoji.get('waxing_gibbous_moon'),
      emoji.get('sun_with_face'),
      emoji.get('full_moon'),
      emoji.get('waning_gibbous_moon'),
      emoji.get('last_quarter_moon'),
      emoji.get('waning_crescent_moon')
    ]
  , gen = emojiGenerator()

module.exports = ({
  textBefore = '',
  textAfter = '',
  ellipsis = true,
  stopText = 'Done'
} = {}) => cb => {

  Spinner.prototype.stop = function(clear) {
    clearInterval(this.id)
    this.id = undefined

    if(clear) this.clearLine(this.stream)
    
    if(stopText) console.log(stopText)
  }

  const spinner = new Spinner({
    onTick: function(msg){
      this.clearLine(this.stream)
      let genValMod = gen.next().value % 10
      this.stream.write(`  ${textBefore}${moonPhases[genValMod]}  ${textAfter}${
        !ellipsis ?
          ''
        : genValMod > 7.5 ?
          '...'
        : genValMod > 5 ?
          '.. '
        : genValMod > 2.5 ?
          '.  '
        : '   '
      } `)
    }
  })

  spinner.start()
  return cb(spinner)
}