import jss from 'jss'
import camelCase from 'jss-camel-case'
import defaultUnit from 'jss-default-unit'
import * as constants from './constants'

jss.use(camelCase())
jss.use(defaultUnit())

const styles = {
    wrapper: {
        height: constants.allMeetingsHeight + 2,
        width: '100%',
        border: '1px solid rgba(0,0,0,.15)',
        borderRadius: '.25rem',
        position: 'relative',
    },
    meeting: {
        backgroundColor: '#CCC',
        position: 'absolute',
        width: `calc(100% - ${constants.timeLineRowWidth}px)`,
        margin: 0,
        padding: 0
    },
    lineHeightOne: {
        lineHeight: 1,
        margin: 0,
        padding: 0,
    },
    placeholder: {
        backgroundColor: '#CCC',
        width: '100%',
        height: constants.allMeetingsHeight,
    },
}

const {classes} = jss.createStyleSheet(styles).attach()

export default classes