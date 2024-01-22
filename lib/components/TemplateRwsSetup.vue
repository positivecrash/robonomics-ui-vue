<template>
<!-- 
    <robo-section v-if="create || active === ''" offset="x0" width="narrow">
        
    </robo-section> -->

    <robo-section offset="x2" width="narrow">

        <robo-section offset="x2">
            <robo-template-rws-active :create="newsetup" />
        </robo-section>

        <robo-section offset="x2">
            <robo-text title="3" v-if="!newsetup">General settings</robo-text>
            <robo-text title="3" v-else>You can enter settings mannually</robo-text>
            <robo-template-rws-setup-form :create="newsetup" @on-update="onRwsUpdate" />
        </robo-section>


        <template v-if="!newsetup">
            <robo-section offset="x2">
                <robo-text title="3" offset="x0">Other users</robo-text>
                <robo-text offset="x1" weight="normal-italic" size="small">To add/remove users you need owner account connected</robo-text>

                <template v-if="rwsnotempty">

                    <robo-section offset="x05">
                        <robo-loader v-if="!users" />
                    </robo-section>
                    
                    <template v-if="users">
                        <robo-template-rws-setup-user 
                        v-for="(user , index) in users" :key="index" 
                        :useraddress="user" 
                        @on-user-delete="onUserDelete"
                    />
                    </template>

                    <robo-template-rws-setup-user-add
                        @on-user-add="onUserAdd"
                    />
                
                </template>
                
                <template v-else>
                    <robo-status type="warning">Start by filling the "General settings"</robo-status>
                </template>

                <!-- <robo-text v-if="usersmsg" weight="normal-italic">{{usersmsg}}</robo-text> -->
            </robo-section>
        </template>

        <robo-section offset="x2" v-if="!newsetup">
            <robo-text title="3" offset="x0">Home assistant</robo-text>
            <robo-text offset="x1" weight="normal-italic" size="small">
                To login into the Home Assistant application via browser locally 
                (in the same network where your smart devices work) create here the password for your user. Make sure this user has been added to the RWS subscription.
            </robo-text>

            
            <robo-template-rws-setup-ha-pass 
                v-if="rwsnotempty"
                @on-save-ha-pass="onSaveHapass"
            />
            <robo-status type="warning" v-else>Start by filling the "General settings"</robo-status>
        </robo-section>

    </robo-section>
</template>

<script>
  export default { name: 'RoboTemplateRwsSetup' }
</script>

<script setup>
import { computed, ref, onMounted, watch, defineEmits } from 'vue'
import { useStore } from 'vuex'
const store = useStore()

const props = defineProps({
    // component settings
    create: {
        type: Boolean,
        default: false
    },

    onRwsUpdate:{
        type: Function
    },
    requestUsers: {
        type: Function
    },
    onUserDelete: {
        type: Function
    },
    onUserAdd: {
        type: Function
    },
    onSaveHapass: {
        type: Function
    }
})

// const emit = defineEmits([
//     'requestUsers'
// ])

// let test = ref(null)

const active = computed( () => {
  return store.state.robonomicsUIvue.rws.active
})
const rws = computed( () => {
  return store.state.robonomicsUIvue.rws.list
})

const newsetup = computed( () => {
    if(active.value === '') {
        return true
    } else {
        return props.create
    }
})

const users = computed( () => {
    return store.state.robonomicsUIvue.rws.users
})

// const users = ref(null)

// const users = computed( () => {
//     // return store.state.robonomicsUIvue.rws.users
//     store.dispatch('rws/findrws', active.value).then(index => {
//         console.log('test', rws.value[index])
//         if(index > -1 && rws.value[index].users) {
//             return rws.value[index].users
//         } else {
//             return null
//         }
//     })
// })

// const usersmsg = computed( () => {
//     if(users?.value && users?.value.length <= 0) {
//         return 'No users found for this subscription'
//     } else {
//         return null
//     }
// })

let rwsnotempty = ref(false)

let isrwsempty = () => {
    store.dispatch('rws/findrws', active.value).then(index => {
        if(index > -1 && rws.value[index].owner!=="" && rws.value[index].controller!=="" && rws.value[index].scontroller!=="") {
            rwsnotempty.value = true
        } else {
            rwsnotempty.value = false
        }
    })
}

// let getusers = userslist => {
//     users.value = userslist
// }

// let removeuser = status => {
//     console.log('removeuser', status)
// }

// let deleteUserProcess = () => {
//     console.log('deleteUserProcess')
//     emit('onUserDelete', status => removeuser(status))
//     emit('requestUsers', active.value, userslist => getusers(userslist))
// }

// const isAdminConnected = computed (() => {
//     return store.state.robonomicsUIvue.rws.active === 
// })

onMounted( () => {
    isrwsempty()
    // emit('requestUsers', active.value, userslist => getusers(userslist))

    watch(rws.value, () => {
        isrwsempty()
    })

    watch(() => active.value, () => {
        isrwsempty()
        // emit('requestUsers', active.value, userslist => getusers(userslist))
    })


    // store.dispatch('rws/decrypt', 'U2FsdGVkX1+z4eGfx9a02e30an31v1MEvYqD98PuYY7EB20kILPb2U4NtUhYQPfS+Sr49ulZa+o9qh+5cGzgb1jTNWcBQ1H3MzZ001H8Jm5Iptee8L7qUfgMAoHHYuMKPhcfMcVmQ/4P0gs3zjuvlmXgozOYuqiNBBsgekXl2QSdoWceoTGSn/JgSxjnRGwJ4s5250nzzSOy+/dmttFeWsUyl6VE6fpioAoQUVOaObbyVijW09uU69njoDFPIr66Z8cOFY4OxIK9MaMeuTX0wjRemD/9go2ScGbcRo+SE/hUjEW7ZOjAqiQGe3mdG5H/sPNk6UVn2kT2Q4dlxdgPSQlCHww7j56eomXQqenuoHXgWnJopZpKmk2yjYRHzzdauw21cdlHb5W1xONnFUOGDRjlphxyiaGqBDSoVw3LS/8qXoVpkjl6HL91EVR6Xpy8LR+CKAPhLzn1kx47+2qFYl75tZq8lnMcTBAMQwW9P7iDb4LgiJXEwXUtvakVnpPAhyOLZ1QIi8X+PYTIw5wfuOrSaHlEoLObkwa95Mb60yN4P9fPtXgkLST6ot1sL5H6Y9NjTXI40UFWLqjrQ298xWzigtefvEjjpITUbexXe+lMTVXSm10+Qi4ArKgseSANXjwk3R6VeQLacGXMsCmaUFaBWT+HmADZoDuhXwyMUOoiRvlE/H4AXS3oiAg3aqzwz9HEvVsoA2t4a5CTwGwDcQ06HmfqSDmivpPMFL7wLVd3OyKqAfZgBSVGkGHQygOXVoUD5jhICnhNz5dnd1Vh2R6Q5r4X32ZUR5gtxqYcy87puZ6k9NcilYkxZLkifJgXuhXnpyca7RacKumajAYT8wPRTFdLfM0Uy6/OsYYzMPGQt+R2O9GB/1wx3GWGoM0Ndhl1/aoHPmnhd0QutSuEAcWfB0atGrrnWpHB6mbNu2Ah+3K7nt26f/u68R72QWH14P9m6qECXW53hQlOwSGqzQ==').then( list => {
    //     test.value = list
    // })

})

</script>