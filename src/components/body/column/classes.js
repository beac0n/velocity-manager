import jss from 'jss'
import camelCase from 'jss-camel-case'
import defaultUnit from 'jss-default-unit'

jss.use(camelCase())
jss.use(defaultUnit())

const styles = {
    lineHeightOne: {
        lineHeight: 1,
        margin: 0,
        padding: 0,
    },
}

const {classes} = jss.createStyleSheet(styles).attach()

export default classes