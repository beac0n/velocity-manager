import Immutable from 'immutable'
import reducers from '../src/redux/reducer'

describe('generated redux tests', () => {

    it('change sprint start to monday', () => {
        let state
        state = reducers(Immutable.fromJS({head:{sprint:{start:{key:'Do',name:'Donnerstag',isWorkDay:true},duration:8}},body:{users:[]}}), {type:'CHANGE_SPRINT_START',sprintDay:'Montag'})
        expect(state.equals(Immutable.fromJS({head:{sprint:{start:{key:'Mo',name:'Montag',isWorkDay:true},duration:8}},body:{users:[]}})))
    })

    it('change sprint duration to 7', () => {
        let state
        state = reducers(Immutable.fromJS({head:{sprint:{start:{key:'Mo',name:'Montag',isWorkDay:true},duration:8}},body:{users:[]}}), {type:'CHANGE_SPRINT_DURATION',sprintDuration:7})
        expect(state.equals(Immutable.fromJS({head:{sprint:{start:{key:'Mo',name:'Montag',isWorkDay:true},duration:7}},body:{users:[]}})))
    })

    it('add user TestUser', () => {
        let state
        state = reducers(Immutable.fromJS({head:{sprint:{start:{key:'Mo',name:'Montag',isWorkDay:true},duration:6}},body:{users:[]}}), {type:'ADD_USER',username:'TestUser'})
        expect(state.equals(Immutable.fromJS({head:{sprint:{start:{key:'Mo',name:'Montag',isWorkDay:true},duration:6}},body:{users:['TestUser']}})))
    })

    it('add event', () => {
        let state
        state = reducers(Immutable.fromJS({head:{sprint:{start:{key:'Mo',name:'Montag',isWorkDay:true},duration:6}},body:{users:['TestUser']}}), {type:'ADD_EVENT',event:{username:'TestUser',columnId:'0',begin:2,end:9}})
        expect(state.equals(Immutable.fromJS({head:{sprint:{start:{key:'Mo',name:'Montag',isWorkDay:true},duration:6}},body:{users:['TestUser'],columns:{TestUser:{'0':[{begin:2,end:9}]}}}})))
    })

    it('update event', () => {
        let state
        state = reducers(Immutable.fromJS({head:{sprint:{start:{key:'Mo',name:'Montag',isWorkDay:true},duration:6}},body:{users:['TestUser'],columns:{TestUser:{'0':[{begin:2,end:9}]}}}}), {type:'UPDATE_EVENT',event:{username:'TestUser',columnId:'0',index:0,note:'t'}})
        expect(state.equals(Immutable.fromJS({head:{sprint:{start:{key:'Mo',name:'Montag',isWorkDay:true},duration:6}},body:{users:['TestUser'],columns:{TestUser:{'0':[{begin:2,end:9,note:'t'}]}}}})))
    })

    it('remove event', () => {
        let state
        state = reducers(Immutable.fromJS({head:{sprint:{start:{key:'Mo',name:'Montag',isWorkDay:true},duration:6}},body:{users:['TestUser'],columns:{TestUser:{'0':[{begin:2,end:9,note:'t'}]}}}}), {type:'REMOVE_EVENT',event:{username:'TestUser',columnId:'0',index:0}})
        expect(state.equals(Immutable.fromJS({head:{sprint:{start:{key:'Mo',name:'Montag',isWorkDay:true},duration:6}},body:{users:['TestUser'],columns:{TestUser:{'0':[]}}}})))
    })
})

