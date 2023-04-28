const entityStatuses = [
    {
        type: ['binary_sensor', 'motion'],
        state: {
            off: {
                text: 'Clear',
                icon: 'motion-clear'
            },
            on: {
                text: 'Detected',
                icon: 'motion-detected'
            },
            unavailable: {
                icon: 'motion-na'
            }
        },
        icon: 'motion-na'
    },

    {
        type: ['binary_sensor', 'window'],
        state: {
            off: {
                text: 'Closed',
                icon: 'window-close'
            },
            on: {
                text: 'Opened',
                icon: 'window-open'
            }
        },
        icon: 'window-na'
    },

    {
        type: ['binary_sensor', 'entrance_contact'],
        state: {
            locked: {
                text: 'Closed',
                icon: 'door-closed'
            },
            off: {
                text: 'Closed',
                icon: 'door-closed'
            },
            unlocked: {
                text: 'Opened',
                icon: 'door-open'
            },
            on: {
                text: 'Opened',
                icon: 'door-open'
            }
        },
        icon: 'circle-question'
    },

    {
        type: ['binary_sensor', 'wleak'],
        state: {
            off: {
                text: 'Dry',
                icon: 'droplet-slash'
            },
            on: {
                text: 'Wet',
                icon: 'droplet'
            }
        },
        icon: 'circle-question'
    },

    {
        type: ['binary_sensor', 'gas_gas'],
        icon: 'flame'
    },

    {
        type: ['switch', 'plug'],
        state: {
            off: {
                icon: 'plug-circle-bolt'
            },
            on: {
                icon: 'plug-circle-minus'
            }
        },
        icon: 'plug'
    },

    {
        type: ['battery'],
        icon: 'battery-three-quarters'
    },

    {
        type: ['camera'],
        icon: 'camera'
    },

    {
        type: ['sensor', 'current_version'],
        icon: 'current-version'
    },

    {
        type: ['humidity'],
        icon: 'droplet-percent'
    },

    {
        type: ['illuminance'],
        icon: 'sun'
    },

    {
        type: ['light'],
        icon: 'lightbulb'
    },

    {
        type: ['lock'],
        state: {
            locked: {
                text: 'Locked',
                icon: 'lock-close'
            },
            unlocked: {
                text: 'Unlocked',
                icon: 'lock-open'
            }
        },
        icon: 'lock-na'
    },

    {
        type: ['media_player'],
        state: {
            off: {
                text: 'Stopped/Paused',
                icon: 'media-player-off'
            },
            on: {
                text: 'Playing',
                icon: 'media-player-on'
            }
        },
        icon: 'media-player-off'
    },

    {
        type: ['pressure'],
        icon: 'pressure'
    },
    
    {
        type: ['switch'],
        state: {
            off: {
                icon: 'switch-off'
            },
            on: {
                icon: 'switch-on'
            }
        },
        icon: 'switch-off'
    },
    
    {
        type: ['temperature'],
        icon: 'temperature-half'
    },

    {
        type: ['vacuum'],
        state: {
            unavailable: {
                text: 'Not found',
                icon: 'vacuum-na'
            }
        },
        icon: 'vacuum'
    },

    {
        type: ['voltage'],
        icon: 'bolt'
    },
    
    {
        type: ['sensor'],
        icon: 'wave-square'
    },
]

export default entityStatuses