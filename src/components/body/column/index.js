import React from 'react'
import {connect} from 'react-redux'
import TopColumn from './topColumn'
import {selectors} from '../../../redux/reducer'
import BottomColumn from './bottomColumn.connected'

const Column = ({username, id, getEvents, isPlaceholder}) => (
    <div>
        <TopColumn isPlaceholder={isPlaceholder} events={getEvents(username, id)}/>
        {!isPlaceholder && <BottomColumn username={username} id={id}/>}
    </div>)


const mapStateToProps = (state) => ({
    getEvents: (username, columnId) => selectors.getEvents(state, username, columnId)
})

export default connect(mapStateToProps)(Column)
