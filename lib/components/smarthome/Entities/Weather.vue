<template>
  <div class="weather-card">
    <!-- Header -->
    <div class="weather-header">
      <robo-text size="large" weight="bold">{{ locationName }}</robo-text>
      <div class="weather-updated">
        <robo-text size="tiny">Updated: {{ lastUpdated }}</robo-text>
      </div>
    </div>

    <!-- Main Weather Info -->
    <div class="weather-main">
      <div class="weather-state">
        <div class="weather-icon" v-html="weatherIcon"></div>
        <robo-text size="small" class="weather-desc">{{ conditionText }}</robo-text>
      </div>
      <div class="weather-temp">
        <robo-text size="large" weight="bold">
          {{ Math.round(currentTemp) }}°C
        </robo-text>
      </div>
    </div>

    <!-- Extra Info -->
    <robo-grid divider="dotted" gap="x05" :columns="1" class="weather-extras">
      <div class="weather-extra">
        <span v-html="metricIcons.humidity"></span>
        <robo-text size="small">Humidity: <b>{{ humidity }}%</b></robo-text>
      </div>

      <div class="weather-extra">
        <span v-html="metricIcons.wind"></span>
        <robo-text size="small">Wind: <b>{{ windSpeed }} {{ windSpeedUnit }}</b></robo-text>
      </div>

      <div class="weather-extra">
        <span v-html="metricIcons.feels"></span>
        <robo-text size="small">Feels like: <b>{{ feelsLike }}{{ feelsLikeUnit }}</b></robo-text>
      </div>

      <div class="weather-extra" v-if="dewPoint !== null">
        <span v-html="metricIcons.dew"></span>
        <robo-text size="small">Dew Point: <b>{{ dewPoint }}°C</b></robo-text>
      </div>

      <div class="weather-extra" v-if="pressure !== null">
        <span v-html="metricIcons.pressure"></span>
        <robo-text size="small">Pressure: <b>{{ pressure }} {{ pressureUnit }}</b></robo-text>
      </div>

      <div class="weather-extra" v-if="uvIndex !== null">
        <span v-html="metricIcons.uv"></span>
        <robo-text size="small">UV Index: <b>{{ uvIndex }}</b></robo-text>
      </div>

      <div class="weather-extra" v-if="visibility !== null">
        <span v-html="metricIcons.visibility"></span>
        <robo-text size="small">Visibility: <b>{{ visibility }} km</b></robo-text>
      </div>
    </robo-grid>


    <!-- Forecast -->
    <div class="weather-forecast">
      <div
        class="forecast-day"
        v-for="(day, idx) in forecast.slice(0, 5)"
        :key="idx"
      >
        <div class="forecast-date">{{ day.date }}</div>
        <div class="forecast-icon" v-html="getIcon(day.state)"></div>
        <div class="forecast-temp">
          {{ Math.round(day.max) }}° / {{ Math.round(day.min) }}°
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue"
import { useStore } from 'vuex'

const props = defineProps({
  entityData: Object,
  entityID: String,
  services: Object,
})

defineOptions({ name: 'RoboSmarthomeEntityWeather' })

const forecast = ref([]);
const store = useStore()

// Data mapping 
const locationName = computed(
  () => props.entityData?.attributes?.friendly_name || "Weather"
)
const currentTemp = computed(
  () => props.entityData?.attributes?.temperature ?? 0
)
const feelsLike = computed(
  () =>
    props.entityData?.attributes?.apparent_temperature ?? currentTemp.value
)
const feelsLikeUnit = computed(() => props.entityData?.attributes?.temperature_unit ?? 'hPa')
const humidity = computed(() => props.entityData?.attributes?.humidity ?? 0)
const windSpeed = computed(() => props.entityData?.attributes?.wind_speed ?? 0)
const windSpeedUnit = computed(() => props.entityData.attributes?.wind_speed_unit ?? 'km/h')
const dewPoint = computed(() => props.entityData?.attributes?.dew_point ?? null)
const pressure = computed(() => props.entityData?.attributes?.pressure ?? null)
const pressureUnit = computed(() => props.entityData?.attributes?.pressure_unit ?? '°C')
const uvIndex = computed(() => props.entityData?.attributes?.uv_index ?? null)
const visibility = computed(() => props.entityData?.attributes?.visibility ?? null)
const conditionText = computed(
  () => props.entityData?.state ?? "Unknown"
)
// const forecast = computed(() => props.entityData?.attributes?.forecast || [])

const lastUpdated = computed(() => {
  const dt = props.entityData?.lastUpdated
  return dt ? new Date(dt).toLocaleTimeString() : "-"
})


//SVG Icons 
const icons = {
  sunny: `<?xml version="1.0" encoding="utf-8"?>
    <!-- (c) ammap.com | SVG weather icons -->
    <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        width="64"
        height="64"
        viewbox="0 0 64 64">
        <defs>
            <filter id="blur" width="200%" height="200%">
                <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
                <feOffset dx="0" dy="4" result="offsetblur"/>
                <feComponentTransfer>
                    <feFuncA type="linear" slope="0.05"/>
                </feComponentTransfer>
                <feMerge> 
                    <feMergeNode/>
                    <feMergeNode in="SourceGraphic"/> 
                </feMerge>
            </filter>
            <style type="text/css"><![CDATA[
    /*
    ** CLOUDS
    */
    @keyframes am-weather-cloud-1 {
      0% {
        -webkit-transform: translate(-5px,0px);
          -moz-transform: translate(-5px,0px);
            -ms-transform: translate(-5px,0px);
                transform: translate(-5px,0px);
      }

      50% {
        -webkit-transform: translate(10px,0px);
          -moz-transform: translate(10px,0px);
            -ms-transform: translate(10px,0px);
                transform: translate(10px,0px);
      }

      100% {
        -webkit-transform: translate(-5px,0px);
          -moz-transform: translate(-5px,0px);
            -ms-transform: translate(-5px,0px);
                transform: translate(-5px,0px);
      }
    }

    .am-weather-cloud-1 {
      -webkit-animation-name: am-weather-cloud-1;
        -moz-animation-name: am-weather-cloud-1;
              animation-name: am-weather-cloud-1;
      -webkit-animation-duration: 7s;
        -moz-animation-duration: 7s;
              animation-duration: 7s;
      -webkit-animation-timing-function: linear;
        -moz-animation-timing-function: linear;
              animation-timing-function: linear;
      -webkit-animation-iteration-count: infinite;
        -moz-animation-iteration-count: infinite;
              animation-iteration-count: infinite;
    }

    @keyframes am-weather-cloud-2 {
      0% {
        -webkit-transform: translate(0px,0px);
          -moz-transform: translate(0px,0px);
            -ms-transform: translate(0px,0px);
                transform: translate(0px,0px);
      }

      50% {
        -webkit-transform: translate(2px,0px);
          -moz-transform: translate(2px,0px);
            -ms-transform: translate(2px,0px);
                transform: translate(2px,0px);
      }

      100% {
        -webkit-transform: translate(0px,0px);
          -moz-transform: translate(0px,0px);
            -ms-transform: translate(0px,0px);
                transform: translate(0px,0px);
      }
    }

    .am-weather-cloud-2 {
      -webkit-animation-name: am-weather-cloud-2;
        -moz-animation-name: am-weather-cloud-2;
              animation-name: am-weather-cloud-2;
      -webkit-animation-duration: 3s;
        -moz-animation-duration: 3s;
              animation-duration: 3s;
      -webkit-animation-timing-function: linear;
        -moz-animation-timing-function: linear;
              animation-timing-function: linear;
      -webkit-animation-iteration-count: infinite;
        -moz-animation-iteration-count: infinite;
              animation-iteration-count: infinite;
    }

    /*
    ** SUN
    */
    @keyframes am-weather-sun {
      0% {
        -webkit-transform: rotate(0deg);
          -moz-transform: rotate(0deg);
            -ms-transform: rotate(0deg);
                transform: rotate(0deg);
      }

      100% {
        -webkit-transform: rotate(360deg);
          -moz-transform: rotate(360deg);
            -ms-transform: rotate(360deg);
                transform: rotate(360deg);
      }
    }

    .am-weather-sun {
      -webkit-animation-name: am-weather-sun;
        -moz-animation-name: am-weather-sun;
          -ms-animation-name: am-weather-sun;
              animation-name: am-weather-sun;
      -webkit-animation-duration: 9s;
        -moz-animation-duration: 9s;
          -ms-animation-duration: 9s;
              animation-duration: 9s;
      -webkit-animation-timing-function: linear;
        -moz-animation-timing-function: linear;
          -ms-animation-timing-function: linear;
              animation-timing-function: linear;
      -webkit-animation-iteration-count: infinite;
        -moz-animation-iteration-count: infinite;
          -ms-animation-iteration-count: infinite;
              animation-iteration-count: infinite;
    }

    @keyframes am-weather-sun-shiny {
      0% {
        stroke-dasharray: 3px 10px;
        stroke-dashoffset: 0px;
      }

      50% {
        stroke-dasharray: 0.1px 10px;
        stroke-dashoffset: -1px;
      }

      100% {
        stroke-dasharray: 3px 10px;
        stroke-dashoffset: 0px;
      }
    }

    .am-weather-sun-shiny line {
      -webkit-animation-name: am-weather-sun-shiny;
        -moz-animation-name: am-weather-sun-shiny;
          -ms-animation-name: am-weather-sun-shiny;
              animation-name: am-weather-sun-shiny;
      -webkit-animation-duration: 2s;
        -moz-animation-duration: 2s;
          -ms-animation-duration: 2s;
              animation-duration: 2s;
      -webkit-animation-timing-function: linear;
        -moz-animation-timing-function: linear;
          -ms-animation-timing-function: linear;
              animation-timing-function: linear;
      -webkit-animation-iteration-count: infinite;
        -moz-animation-iteration-count: infinite;
          -ms-animation-iteration-count: infinite;
              animation-iteration-count: infinite;
    }




    /*
    ** MOON
    */
    @keyframes am-weather-moon {
      0% {
        -webkit-transform: rotate(0deg);
          -moz-transform: rotate(0deg);
            -ms-transform: rotate(0deg);
                transform: rotate(0deg);
      }

      50% {
        -webkit-transform: rotate(15deg);
          -moz-transform: rotate(15deg);
            -ms-transform: rotate(15deg);
                transform: rotate(15deg);
      }

      100% {
        -webkit-transform: rotate(0deg);
          -moz-transform: rotate(0deg);
            -ms-transform: rotate(0deg);
                transform: rotate(0deg);
      }
    }

    .am-weather-moon {
      -webkit-animation-name: am-weather-moon;
        -moz-animation-name: am-weather-moon;
          -ms-animation-name: am-weather-moon;
              animation-name: am-weather-moon;
      -webkit-animation-duration: 6s;
        -moz-animation-duration: 6s;
          -ms-animation-duration: 6s;
              animation-duration: 6s;
      -webkit-animation-timing-function: linear;
        -moz-animation-timing-function: linear;
          -ms-animation-timing-function: linear;
              animation-timing-function: linear;
      -webkit-animation-iteration-count: infinite;
        -moz-animation-iteration-count: infinite;
          -ms-animation-iteration-count: infinite;
              animation-iteration-count: infinite;
      -webkit-transform-origin: 12.5px 15.15px 0; /* TODO FF CENTER ISSUE */
        -moz-transform-origin: 12.5px 15.15px 0; /* TODO FF CENTER ISSUE */
          -ms-transform-origin: 12.5px 15.15px 0; /* TODO FF CENTER ISSUE */
              transform-origin: 12.5px 15.15px 0; /* TODO FF CENTER ISSUE */
    }

    @keyframes am-weather-moon-star-1 {
      0% {
        opacity: 0;
      }

      100% {
        opacity: 1;
      }
    }

    .am-weather-moon-star-1 {
      -webkit-animation-name: am-weather-moon-star-1;
        -moz-animation-name: am-weather-moon-star-1;
          -ms-animation-name: am-weather-moon-star-1;
              animation-name: am-weather-moon-star-1;
      -webkit-animation-delay: 3s;
        -moz-animation-delay: 3s;
          -ms-animation-delay: 3s;
              animation-delay: 3s;
      -webkit-animation-duration: 5s;
        -moz-animation-duration: 5s;
          -ms-animation-duration: 5s;
              animation-duration: 5s;
      -webkit-animation-timing-function: linear;
        -moz-animation-timing-function: linear;
          -ms-animation-timing-function: linear;
              animation-timing-function: linear;
      -webkit-animation-iteration-count: 1;
        -moz-animation-iteration-count: 1;
          -ms-animation-iteration-count: 1;
              animation-iteration-count: 1;
    }

    @keyframes am-weather-moon-star-2 {
      0% {
        opacity: 0;
      }

      100% {
        opacity: 1;
      }
    }

    .am-weather-moon-star-2 {
      -webkit-animation-name: am-weather-moon-star-2;
        -moz-animation-name: am-weather-moon-star-2;
          -ms-animation-name: am-weather-moon-star-2;
              animation-name: am-weather-moon-star-2;
      -webkit-animation-delay: 5s;
        -moz-animation-delay: 5s;
          -ms-animation-delay: 5s;
              animation-delay: 5s;
      -webkit-animation-duration: 4s;
        -moz-animation-duration: 4s;
          -ms-animation-duration: 4s;
              animation-duration: 4s;
      -webkit-animation-timing-function: linear;
        -moz-animation-timing-function: linear;
          -ms-animation-timing-function: linear;
              animation-timing-function: linear;
      -webkit-animation-iteration-count: 1;
        -moz-animation-iteration-count: 1;
          -ms-animation-iteration-count: 1;
              animation-iteration-count: 1;
    }

    /*
    ** RAIN
    */
    @keyframes am-weather-rain {
      0% {
        stroke-dashoffset: 0;
      }

      100% {
        stroke-dashoffset: -100;
      }
    }

    .am-weather-rain-1 {
      -webkit-animation-name: am-weather-rain;
        -moz-animation-name: am-weather-rain;
          -ms-animation-name: am-weather-rain;
              animation-name: am-weather-rain;
      -webkit-animation-duration: 8s;
        -moz-animation-duration: 8s;
          -ms-animation-duration: 8s;
              animation-duration: 8s;
      -webkit-animation-timing-function: linear;
        -moz-animation-timing-function: linear;
          -ms-animation-timing-function: linear;
              animation-timing-function: linear;
      -webkit-animation-iteration-count: infinite;
        -moz-animation-iteration-count: infinite;
          -ms-animation-iteration-count: infinite;
              animation-iteration-count: infinite;
    }

    .am-weather-rain-2 {
      -webkit-animation-name: am-weather-rain;
        -moz-animation-name: am-weather-rain;
          -ms-animation-name: am-weather-rain;
              animation-name: am-weather-rain;
      -webkit-animation-delay: 0.25s;
        -moz-animation-delay: 0.25s;
          -ms-animation-delay: 0.25s;
              animation-delay: 0.25s;
      -webkit-animation-duration: 8s;
        -moz-animation-duration: 8s;
          -ms-animation-duration: 8s;
              animation-duration: 8s;
      -webkit-animation-timing-function: linear;
        -moz-animation-timing-function: linear;
          -ms-animation-timing-function: linear;
              animation-timing-function: linear;
      -webkit-animation-iteration-count: infinite;
        -moz-animation-iteration-count: infinite;
          -ms-animation-iteration-count: infinite;
              animation-iteration-count: infinite;
    }


    /*
    ** SNOW
    */
    @keyframes am-weather-snow {
      0% {
        -webkit-transform: translateX(0) translateY(0);
          -moz-transform: translateX(0) translateY(0);
            -ms-transform: translateX(0) translateY(0);
                transform: translateX(0) translateY(0);
      }

      33.33% {
        -webkit-transform: translateX(-1.2px) translateY(2px);
          -moz-transform: translateX(-1.2px) translateY(2px);
            -ms-transform: translateX(-1.2px) translateY(2px);
                transform: translateX(-1.2px) translateY(2px);
      }

      66.66% {
        -webkit-transform: translateX(1.4px) translateY(4px);
          -moz-transform: translateX(1.4px) translateY(4px);
            -ms-transform: translateX(1.4px) translateY(4px);
                transform: translateX(1.4px) translateY(4px);
        opacity: 1;
      }

      100% {
        -webkit-transform: translateX(-1.6px) translateY(6px);
          -moz-transform: translateX(-1.6px) translateY(6px);
            -ms-transform: translateX(-1.6px) translateY(6px);
                transform: translateX(-1.6px) translateY(6px);
        opacity: 0;
      }
    }

    @keyframes am-weather-snow-reverse {
      0% {
        -webkit-transform: translateX(0) translateY(0);
          -moz-transform: translateX(0) translateY(0);
            -ms-transform: translateX(0) translateY(0);
                transform: translateX(0) translateY(0);
      }

      33.33% {
        -webkit-transform: translateX(1.2px) translateY(2px);
          -moz-transform: translateX(1.2px) translateY(2px);
            -ms-transform: translateX(1.2px) translateY(2px);
                transform: translateX(1.2px) translateY(2px);
      }

      66.66% {
        -webkit-transform: translateX(-1.4px) translateY(4px);
          -moz-transform: translateX(-1.4px) translateY(4px);
            -ms-transform: translateX(-1.4px) translateY(4px);
                transform: translateX(-1.4px) translateY(4px);
        opacity: 1;
      }

      100% {
        -webkit-transform: translateX(1.6px) translateY(6px);
          -moz-transform: translateX(1.6px) translateY(6px);
            -ms-transform: translateX(1.6px) translateY(6px);
                transform: translateX(1.6px) translateY(6px);
        opacity: 0;
      }
    }

    .am-weather-snow-1 {
      -webkit-animation-name: am-weather-snow;
        -moz-animation-name: am-weather-snow;
          -ms-animation-name: am-weather-snow;
              animation-name: am-weather-snow;
      -webkit-animation-duration: 2s;
        -moz-animation-duration: 2s;
          -ms-animation-duration: 2s;
              animation-duration: 2s;
      -webkit-animation-timing-function: linear;
        -moz-animation-timing-function: linear;
          -ms-animation-timing-function: linear;
              animation-timing-function: linear;
      -webkit-animation-iteration-count: infinite;
        -moz-animation-iteration-count: infinite;
          -ms-animation-iteration-count: infinite;
              animation-iteration-count: infinite;
    }

    .am-weather-snow-2 {
      -webkit-animation-name: am-weather-snow;
        -moz-animation-name: am-weather-snow;
          -ms-animation-name: am-weather-snow;
              animation-name: am-weather-snow;
      -webkit-animation-delay: 1.2s;
        -moz-animation-delay: 1.2s;
          -ms-animation-delay: 1.2s;
              animation-delay: 1.2s;
      -webkit-animation-duration: 2s;
        -moz-animation-duration: 2s;
          -ms-animation-duration: 2s;
              animation-duration: 2s;
      -webkit-animation-timing-function: linear;
        -moz-animation-timing-function: linear;
          -ms-animation-timing-function: linear;
              animation-timing-function: linear;
      -webkit-animation-iteration-count: infinite;
        -moz-animation-iteration-count: infinite;
          -ms-animation-iteration-count: infinite;
              animation-iteration-count: infinite;
    }

    .am-weather-snow-3 {
      -webkit-animation-name: am-weather-snow-reverse;
        -moz-animation-name: am-weather-snow-reverse;
          -ms-animation-name: am-weather-snow-reverse;
              animation-name: am-weather-snow-reverse;
      -webkit-animation-duration: 2s;
        -moz-animation-duration: 2s;
          -ms-animation-duration: 2s;
              animation-duration: 2s;
      -webkit-animation-timing-function: linear;
        -moz-animation-timing-function: linear;
          -ms-animation-timing-function: linear;
              animation-timing-function: linear;
      -webkit-animation-iteration-count: infinite;
        -moz-animation-iteration-count: infinite;
          -ms-animation-iteration-count: infinite;
              animation-iteration-count: infinite;
    }

    /*
    ** EASING
    */
    .am-weather-easing-ease-in-out {
      -webkit-animation-timing-function: ease-in-out;
        -moz-animation-timing-function: ease-in-out;
          -ms-animation-timing-function: ease-in-out;
              animation-timing-function: ease-in-out;
    }

            ]]></style>
        </defs>
        <g filter="url(#blur)" id="day">
            <g transform="translate(32,32)">
                <g class="am-weather-sun am-weather-sun-shiny am-weather-easing-ease-in-out">
                    <g>
                        <line fill="none" stroke="orange" stroke-linecap="round" stroke-width="2" transform="translate(0,9)" x1="0" x2="0" y1="0" y2="3" />
                    </g>
                    <g transform="rotate(45)">
                        <line fill="none" stroke="orange" stroke-linecap="round" stroke-width="2" transform="translate(0,9)" x1="0" x2="0" y1="0" y2="3" />
                    </g>
                    <g transform="rotate(90)">
                        <line fill="none" stroke="orange" stroke-linecap="round" stroke-width="2" transform="translate(0,9)" x1="0" x2="0" y1="0" y2="3" />
                    </g>
                    <g transform="rotate(135)">
                        <line fill="none" stroke="orange" stroke-linecap="round" stroke-width="2" transform="translate(0,9)" x1="0" x2="0" y1="0" y2="3" />
                    </g>
                    <g transform="rotate(180)">
                        <line fill="none" stroke="orange" stroke-linecap="round" stroke-width="2" transform="translate(0,9)" x1="0" x2="0" y1="0" y2="3" />
                    </g>
                    <g transform="rotate(225)">
                        <line fill="none" stroke="orange" stroke-linecap="round" stroke-width="2" transform="translate(0,9)" x1="0" x2="0" y1="0" y2="3" />
                    </g>
                    <g transform="rotate(270)">
                        <line fill="none" stroke="orange" stroke-linecap="round" stroke-width="2" transform="translate(0,9)" x1="0" x2="0" y1="0" y2="3" />
                    </g>
                    <g transform="rotate(315)">
                        <line fill="none" stroke="orange" stroke-linecap="round" stroke-width="2" transform="translate(0,9)" x1="0" x2="0" y1="0" y2="3" />
                    </g>
                </g>
                <circle cx="0" cy="0" fill="orange" r="5" stroke="orange" stroke-width="2"/>
            </g>
        </g>
    </svg>`,
  cloudy: `<?xml version="1.0" encoding="utf-8"?>
    <!-- (c) ammap.com | SVG weather icons -->
    <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        width="64"
        height="64"
        viewbox="0 0 64 64">
        <defs>
            <filter id="blur" width="200%" height="200%">
                <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
                <feOffset dx="0" dy="4" result="offsetblur"/>
                <feComponentTransfer>
                    <feFuncA type="linear" slope="0.05"/>
                </feComponentTransfer>
            <feMerge> 
              <feMergeNode/>
              <feMergeNode in="SourceGraphic"/> 
            </feMerge>
            </filter>
            <style type="text/css"><![CDATA[
    /*
    ** CLOUDS
    */
    @keyframes am-weather-cloud-1 {
      0% {
        -webkit-transform: translate(-5px,0px);
          -moz-transform: translate(-5px,0px);
            -ms-transform: translate(-5px,0px);
                transform: translate(-5px,0px);
      }

      50% {
        -webkit-transform: translate(10px,0px);
          -moz-transform: translate(10px,0px);
            -ms-transform: translate(10px,0px);
                transform: translate(10px,0px);
      }

      100% {
        -webkit-transform: translate(-5px,0px);
          -moz-transform: translate(-5px,0px);
            -ms-transform: translate(-5px,0px);
                transform: translate(-5px,0px);
      }
    }

    .am-weather-cloud-1 {
      -webkit-animation-name: am-weather-cloud-1;
        -moz-animation-name: am-weather-cloud-1;
              animation-name: am-weather-cloud-1;
      -webkit-animation-duration: 7s;
        -moz-animation-duration: 7s;
              animation-duration: 7s;
      -webkit-animation-timing-function: linear;
        -moz-animation-timing-function: linear;
              animation-timing-function: linear;
      -webkit-animation-iteration-count: infinite;
        -moz-animation-iteration-count: infinite;
              animation-iteration-count: infinite;
    }

    @keyframes am-weather-cloud-2 {
      0% {
        -webkit-transform: translate(0px,0px);
          -moz-transform: translate(0px,0px);
            -ms-transform: translate(0px,0px);
                transform: translate(0px,0px);
      }

      50% {
        -webkit-transform: translate(2px,0px);
          -moz-transform: translate(2px,0px);
            -ms-transform: translate(2px,0px);
                transform: translate(2px,0px);
      }

      100% {
        -webkit-transform: translate(0px,0px);
          -moz-transform: translate(0px,0px);
            -ms-transform: translate(0px,0px);
                transform: translate(0px,0px);
      }
    }

    .am-weather-cloud-2 {
      -webkit-animation-name: am-weather-cloud-2;
        -moz-animation-name: am-weather-cloud-2;
              animation-name: am-weather-cloud-2;
      -webkit-animation-duration: 3s;
        -moz-animation-duration: 3s;
              animation-duration: 3s;
      -webkit-animation-timing-function: linear;
        -moz-animation-timing-function: linear;
              animation-timing-function: linear;
      -webkit-animation-iteration-count: infinite;
        -moz-animation-iteration-count: infinite;
              animation-iteration-count: infinite;
    }

    /*
    ** SUN
    */
    @keyframes am-weather-sun {
      0% {
        -webkit-transform: rotate(0deg);
          -moz-transform: rotate(0deg);
            -ms-transform: rotate(0deg);
                transform: rotate(0deg);
      }

      100% {
        -webkit-transform: rotate(360deg);
          -moz-transform: rotate(360deg);
            -ms-transform: rotate(360deg);
                transform: rotate(360deg);
      }
    }

    .am-weather-sun {
      -webkit-animation-name: am-weather-sun;
        -moz-animation-name: am-weather-sun;
          -ms-animation-name: am-weather-sun;
              animation-name: am-weather-sun;
      -webkit-animation-duration: 9s;
        -moz-animation-duration: 9s;
          -ms-animation-duration: 9s;
              animation-duration: 9s;
      -webkit-animation-timing-function: linear;
        -moz-animation-timing-function: linear;
          -ms-animation-timing-function: linear;
              animation-timing-function: linear;
      -webkit-animation-iteration-count: infinite;
        -moz-animation-iteration-count: infinite;
          -ms-animation-iteration-count: infinite;
              animation-iteration-count: infinite;
    }

    @keyframes am-weather-sun-shiny {
      0% {
        stroke-dasharray: 3px 10px;
        stroke-dashoffset: 0px;
      }

      50% {
        stroke-dasharray: 0.1px 10px;
        stroke-dashoffset: -1px;
      }

      100% {
        stroke-dasharray: 3px 10px;
        stroke-dashoffset: 0px;
      }
    }

    .am-weather-sun-shiny line {
      -webkit-animation-name: am-weather-sun-shiny;
        -moz-animation-name: am-weather-sun-shiny;
          -ms-animation-name: am-weather-sun-shiny;
              animation-name: am-weather-sun-shiny;
      -webkit-animation-duration: 2s;
        -moz-animation-duration: 2s;
          -ms-animation-duration: 2s;
              animation-duration: 2s;
      -webkit-animation-timing-function: linear;
        -moz-animation-timing-function: linear;
          -ms-animation-timing-function: linear;
              animation-timing-function: linear;
      -webkit-animation-iteration-count: infinite;
        -moz-animation-iteration-count: infinite;
          -ms-animation-iteration-count: infinite;
              animation-iteration-count: infinite;
    }




    /*
    ** MOON
    */
    @keyframes am-weather-moon {
      0% {
        -webkit-transform: rotate(0deg);
          -moz-transform: rotate(0deg);
            -ms-transform: rotate(0deg);
                transform: rotate(0deg);
      }

      50% {
        -webkit-transform: rotate(15deg);
          -moz-transform: rotate(15deg);
            -ms-transform: rotate(15deg);
                transform: rotate(15deg);
      }

      100% {
        -webkit-transform: rotate(0deg);
          -moz-transform: rotate(0deg);
            -ms-transform: rotate(0deg);
                transform: rotate(0deg);
      }
    }

    .am-weather-moon {
      -webkit-animation-name: am-weather-moon;
        -moz-animation-name: am-weather-moon;
          -ms-animation-name: am-weather-moon;
              animation-name: am-weather-moon;
      -webkit-animation-duration: 6s;
        -moz-animation-duration: 6s;
          -ms-animation-duration: 6s;
              animation-duration: 6s;
      -webkit-animation-timing-function: linear;
        -moz-animation-timing-function: linear;
          -ms-animation-timing-function: linear;
              animation-timing-function: linear;
      -webkit-animation-iteration-count: infinite;
        -moz-animation-iteration-count: infinite;
          -ms-animation-iteration-count: infinite;
              animation-iteration-count: infinite;
      -webkit-transform-origin: 12.5px 15.15px 0; /* TODO FF CENTER ISSUE */
        -moz-transform-origin: 12.5px 15.15px 0; /* TODO FF CENTER ISSUE */
          -ms-transform-origin: 12.5px 15.15px 0; /* TODO FF CENTER ISSUE */
              transform-origin: 12.5px 15.15px 0; /* TODO FF CENTER ISSUE */
    }

    @keyframes am-weather-moon-star-1 {
      0% {
        opacity: 0;
      }

      100% {
        opacity: 1;
      }
    }

    .am-weather-moon-star-1 {
      -webkit-animation-name: am-weather-moon-star-1;
        -moz-animation-name: am-weather-moon-star-1;
          -ms-animation-name: am-weather-moon-star-1;
              animation-name: am-weather-moon-star-1;
      -webkit-animation-delay: 3s;
        -moz-animation-delay: 3s;
          -ms-animation-delay: 3s;
              animation-delay: 3s;
      -webkit-animation-duration: 5s;
        -moz-animation-duration: 5s;
          -ms-animation-duration: 5s;
              animation-duration: 5s;
      -webkit-animation-timing-function: linear;
        -moz-animation-timing-function: linear;
          -ms-animation-timing-function: linear;
              animation-timing-function: linear;
      -webkit-animation-iteration-count: 1;
        -moz-animation-iteration-count: 1;
          -ms-animation-iteration-count: 1;
              animation-iteration-count: 1;
    }

    @keyframes am-weather-moon-star-2 {
      0% {
        opacity: 0;
      }

      100% {
        opacity: 1;
      }
    }

    .am-weather-moon-star-2 {
      -webkit-animation-name: am-weather-moon-star-2;
        -moz-animation-name: am-weather-moon-star-2;
          -ms-animation-name: am-weather-moon-star-2;
              animation-name: am-weather-moon-star-2;
      -webkit-animation-delay: 5s;
        -moz-animation-delay: 5s;
          -ms-animation-delay: 5s;
              animation-delay: 5s;
      -webkit-animation-duration: 4s;
        -moz-animation-duration: 4s;
          -ms-animation-duration: 4s;
              animation-duration: 4s;
      -webkit-animation-timing-function: linear;
        -moz-animation-timing-function: linear;
          -ms-animation-timing-function: linear;
              animation-timing-function: linear;
      -webkit-animation-iteration-count: 1;
        -moz-animation-iteration-count: 1;
          -ms-animation-iteration-count: 1;
              animation-iteration-count: 1;
    }

    /*
    ** RAIN
    */
    @keyframes am-weather-rain {
      0% {
        stroke-dashoffset: 0;
      }

      100% {
        stroke-dashoffset: -100;
      }
    }

    .am-weather-rain-1 {
      -webkit-animation-name: am-weather-rain;
        -moz-animation-name: am-weather-rain;
          -ms-animation-name: am-weather-rain;
              animation-name: am-weather-rain;
      -webkit-animation-duration: 8s;
        -moz-animation-duration: 8s;
          -ms-animation-duration: 8s;
              animation-duration: 8s;
      -webkit-animation-timing-function: linear;
        -moz-animation-timing-function: linear;
          -ms-animation-timing-function: linear;
              animation-timing-function: linear;
      -webkit-animation-iteration-count: infinite;
        -moz-animation-iteration-count: infinite;
          -ms-animation-iteration-count: infinite;
              animation-iteration-count: infinite;
    }

    .am-weather-rain-2 {
      -webkit-animation-name: am-weather-rain;
        -moz-animation-name: am-weather-rain;
          -ms-animation-name: am-weather-rain;
              animation-name: am-weather-rain;
      -webkit-animation-delay: 0.25s;
        -moz-animation-delay: 0.25s;
          -ms-animation-delay: 0.25s;
              animation-delay: 0.25s;
      -webkit-animation-duration: 8s;
        -moz-animation-duration: 8s;
          -ms-animation-duration: 8s;
              animation-duration: 8s;
      -webkit-animation-timing-function: linear;
        -moz-animation-timing-function: linear;
          -ms-animation-timing-function: linear;
              animation-timing-function: linear;
      -webkit-animation-iteration-count: infinite;
        -moz-animation-iteration-count: infinite;
          -ms-animation-iteration-count: infinite;
              animation-iteration-count: infinite;
    }


    /*
    ** SNOW
    */
    @keyframes am-weather-snow {
      0% {
        -webkit-transform: translateX(0) translateY(0);
          -moz-transform: translateX(0) translateY(0);
            -ms-transform: translateX(0) translateY(0);
                transform: translateX(0) translateY(0);
      }

      33.33% {
        -webkit-transform: translateX(-1.2px) translateY(2px);
          -moz-transform: translateX(-1.2px) translateY(2px);
            -ms-transform: translateX(-1.2px) translateY(2px);
                transform: translateX(-1.2px) translateY(2px);
      }

      66.66% {
        -webkit-transform: translateX(1.4px) translateY(4px);
          -moz-transform: translateX(1.4px) translateY(4px);
            -ms-transform: translateX(1.4px) translateY(4px);
                transform: translateX(1.4px) translateY(4px);
        opacity: 1;
      }

      100% {
        -webkit-transform: translateX(-1.6px) translateY(6px);
          -moz-transform: translateX(-1.6px) translateY(6px);
            -ms-transform: translateX(-1.6px) translateY(6px);
                transform: translateX(-1.6px) translateY(6px);
        opacity: 0;
      }
    }

    @keyframes am-weather-snow-reverse {
      0% {
        -webkit-transform: translateX(0) translateY(0);
          -moz-transform: translateX(0) translateY(0);
            -ms-transform: translateX(0) translateY(0);
                transform: translateX(0) translateY(0);
      }

      33.33% {
        -webkit-transform: translateX(1.2px) translateY(2px);
          -moz-transform: translateX(1.2px) translateY(2px);
            -ms-transform: translateX(1.2px) translateY(2px);
                transform: translateX(1.2px) translateY(2px);
      }

      66.66% {
        -webkit-transform: translateX(-1.4px) translateY(4px);
          -moz-transform: translateX(-1.4px) translateY(4px);
            -ms-transform: translateX(-1.4px) translateY(4px);
                transform: translateX(-1.4px) translateY(4px);
        opacity: 1;
      }

      100% {
        -webkit-transform: translateX(1.6px) translateY(6px);
          -moz-transform: translateX(1.6px) translateY(6px);
            -ms-transform: translateX(1.6px) translateY(6px);
                transform: translateX(1.6px) translateY(6px);
        opacity: 0;
      }
    }

    .am-weather-snow-1 {
      -webkit-animation-name: am-weather-snow;
        -moz-animation-name: am-weather-snow;
          -ms-animation-name: am-weather-snow;
              animation-name: am-weather-snow;
      -webkit-animation-duration: 2s;
        -moz-animation-duration: 2s;
          -ms-animation-duration: 2s;
              animation-duration: 2s;
      -webkit-animation-timing-function: linear;
        -moz-animation-timing-function: linear;
          -ms-animation-timing-function: linear;
              animation-timing-function: linear;
      -webkit-animation-iteration-count: infinite;
        -moz-animation-iteration-count: infinite;
          -ms-animation-iteration-count: infinite;
              animation-iteration-count: infinite;
    }

    .am-weather-snow-2 {
      -webkit-animation-name: am-weather-snow;
        -moz-animation-name: am-weather-snow;
          -ms-animation-name: am-weather-snow;
              animation-name: am-weather-snow;
      -webkit-animation-delay: 1.2s;
        -moz-animation-delay: 1.2s;
          -ms-animation-delay: 1.2s;
              animation-delay: 1.2s;
      -webkit-animation-duration: 2s;
        -moz-animation-duration: 2s;
          -ms-animation-duration: 2s;
              animation-duration: 2s;
      -webkit-animation-timing-function: linear;
        -moz-animation-timing-function: linear;
          -ms-animation-timing-function: linear;
              animation-timing-function: linear;
      -webkit-animation-iteration-count: infinite;
        -moz-animation-iteration-count: infinite;
          -ms-animation-iteration-count: infinite;
              animation-iteration-count: infinite;
    }

    .am-weather-snow-3 {
      -webkit-animation-name: am-weather-snow-reverse;
        -moz-animation-name: am-weather-snow-reverse;
          -ms-animation-name: am-weather-snow-reverse;
              animation-name: am-weather-snow-reverse;
      -webkit-animation-duration: 2s;
        -moz-animation-duration: 2s;
          -ms-animation-duration: 2s;
              animation-duration: 2s;
      -webkit-animation-timing-function: linear;
        -moz-animation-timing-function: linear;
          -ms-animation-timing-function: linear;
              animation-timing-function: linear;
      -webkit-animation-iteration-count: infinite;
        -moz-animation-iteration-count: infinite;
          -ms-animation-iteration-count: infinite;
              animation-iteration-count: infinite;
    }

    /*
    ** EASING
    */
    .am-weather-easing-ease-in-out {
      -webkit-animation-timing-function: ease-in-out;
        -moz-animation-timing-function: ease-in-out;
          -ms-animation-timing-function: ease-in-out;
              animation-timing-function: ease-in-out;
    }

            ]]></style>
        </defs>
        <g filter="url(#blur)" id="cloudy">
            <g transform="translate(20,10)">
                <g class="am-weather-cloud-1">
                    <path d="M47.7,35.4     c0-4.6-3.7-8.2-8.2-8.2c-1,0-1.9,0.2-2.8,0.5c-0.3-3.4-3.1-6.2-6.6-6.2c-3.7,0-6.7,3-6.7,6.7c0,0.8,0.2,1.6,0.4,2.3     c-0.3-0.1-0.7-0.1-1-0.1c-3.7,0-6.7,3-6.7,6.7c0,3.6,2.9,6.6,6.5,6.7l17.2,0C44.2,43.3,47.7,39.8,47.7,35.4z" fill="#91C0F8" stroke="white" stroke-linejoin="round" stroke-width="1.2" transform="translate(-10,-8), scale(0.6)"/>
                </g>
                <g class="am-weather-cloud-2">
                    <path d="M47.7,35.4     c0-4.6-3.7-8.2-8.2-8.2c-1,0-1.9,0.2-2.8,0.5c-0.3-3.4-3.1-6.2-6.6-6.2c-3.7,0-6.7,3-6.7,6.7c0,0.8,0.2,1.6,0.4,2.3     c-0.3-0.1-0.7-0.1-1-0.1c-3.7,0-6.7,3-6.7,6.7c0,3.6,2.9,6.6,6.5,6.7l17.2,0C44.2,43.3,47.7,39.8,47.7,35.4z" fill="#57A0EE" stroke="white" stroke-linejoin="round" stroke-width="1.2" transform="translate(-20,-11)"/>
                </g>
            </g>
        </g>
    </svg>`,
  rainy: `<?xml version="1.0" encoding="utf-8"?>
    <!-- (c) ammap.com | SVG weather icons -->
    <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        width="64"
        height="64"
        viewbox="0 0 64 64">
        <defs>
            <filter id="blur" width="200%" height="200%">
                <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
                <feOffset dx="0" dy="4" result="offsetblur"/>
                <feComponentTransfer>
                    <feFuncA type="linear" slope="0.05"/>
                </feComponentTransfer>
                <feMerge> 
                    <feMergeNode/>
                    <feMergeNode in="SourceGraphic"/> 
                </feMerge>
            </filter>
            <style type="text/css"><![CDATA[
    /*
    ** RAIN
    */
    @keyframes am-weather-rain {
      0% {
        stroke-dashoffset: 0;
      }

      100% {
        stroke-dashoffset: -100;
      }
    }

    .am-weather-rain-1 {
      -webkit-animation-name: am-weather-rain;
        -moz-animation-name: am-weather-rain;
          -ms-animation-name: am-weather-rain;
              animation-name: am-weather-rain;
      -webkit-animation-duration: 8s;
        -moz-animation-duration: 8s;
          -ms-animation-duration: 8s;
              animation-duration: 8s;
      -webkit-animation-timing-function: linear;
        -moz-animation-timing-function: linear;
          -ms-animation-timing-function: linear;
              animation-timing-function: linear;
      -webkit-animation-iteration-count: infinite;
        -moz-animation-iteration-count: infinite;
          -ms-animation-iteration-count: infinite;
              animation-iteration-count: infinite;
    }

    .am-weather-rain-2 {
      -webkit-animation-name: am-weather-rain;
        -moz-animation-name: am-weather-rain;
          -ms-animation-name: am-weather-rain;
              animation-name: am-weather-rain;
      -webkit-animation-delay: 0.25s;
        -moz-animation-delay: 0.25s;
          -ms-animation-delay: 0.25s;
              animation-delay: 0.25s;
      -webkit-animation-duration: 8s;
        -moz-animation-duration: 8s;
          -ms-animation-duration: 8s;
              animation-duration: 8s;
      -webkit-animation-timing-function: linear;
        -moz-animation-timing-function: linear;
          -ms-animation-timing-function: linear;
              animation-timing-function: linear;
      -webkit-animation-iteration-count: infinite;
        -moz-animation-iteration-count: infinite;
          -ms-animation-iteration-count: infinite;
              animation-iteration-count: infinite;
    }
            ]]></style>
        </defs>
        <g filter="url(#blur)" id="rainy-5">
            <g transform="translate(20,10)">
                <g>
                    <path d="M47.7,35.4c0-4.6-3.7-8.2-8.2-8.2c-1,0-1.9,0.2-2.8,0.5c-0.3-3.4-3.1-6.2-6.6-6.2c-3.7,0-6.7,3-6.7,6.7c0,0.8,0.2,1.6,0.4,2.3    c-0.3-0.1-0.7-0.1-1-0.1c-3.7,0-6.7,3-6.7,6.7c0,3.6,2.9,6.6,6.5,6.7l17.2,0C44.2,43.3,47.7,39.8,47.7,35.4z" fill="#57A0EE" stroke="white" stroke-linejoin="round" stroke-width="1.2" transform="translate(-20,-11)"/>
                </g>
            </g>
            <g transform="translate(34,46), rotate(10)">
                <line class="am-weather-rain-1" fill="none" stroke="#91C0F8" stroke-dasharray="4,7" stroke-linecap="round" stroke-width="2" transform="translate(-6,1)" x1="0" x2="0" y1="0" y2="8" />
                <line class="am-weather-rain-2" fill="none" stroke="#91C0F8" stroke-dasharray="4,7" stroke-linecap="round" stroke-width="2" transform="translate(0,-1)" x1="0" x2="0" y1="0" y2="8" />
            </g>
        </g>
    </svg>`,
  snowy: `<?xml version="1.0" encoding="utf-8"?>
    <!-- (c) ammap.com | SVG weather icons -->
    <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        width="64"
        height="64"
        viewbox="0 0 64 64">
        <defs>
            <filter id="blur" width="200%" height="200%">
                <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
                <feOffset dx="0" dy="4" result="offsetblur"/>
                <feComponentTransfer>
                    <feFuncA type="linear" slope="0.05"/>
                </feComponentTransfer>
                <feMerge> 
                    <feMergeNode/>
                    <feMergeNode in="SourceGraphic"/> 
                </feMerge>
            </filter>
            <style type="text/css"><![CDATA[
    /*
    ** CLOUDS
    */
    @keyframes am-weather-cloud-2 {
      0% {
        -webkit-transform: translate(0px,0px);
          -moz-transform: translate(0px,0px);
            -ms-transform: translate(0px,0px);
                transform: translate(0px,0px);
      }

      50% {
        -webkit-transform: translate(2px,0px);
          -moz-transform: translate(2px,0px);
            -ms-transform: translate(2px,0px);
                transform: translate(2px,0px);
      }

      100% {
        -webkit-transform: translate(0px,0px);
          -moz-transform: translate(0px,0px);
            -ms-transform: translate(0px,0px);
                transform: translate(0px,0px);
      }
    }

    .am-weather-cloud-2 {
      -webkit-animation-name: am-weather-cloud-2;
        -moz-animation-name: am-weather-cloud-2;
              animation-name: am-weather-cloud-2;
      -webkit-animation-duration: 3s;
        -moz-animation-duration: 3s;
              animation-duration: 3s;
      -webkit-animation-timing-function: linear;
        -moz-animation-timing-function: linear;
              animation-timing-function: linear;
      -webkit-animation-iteration-count: infinite;
        -moz-animation-iteration-count: infinite;
              animation-iteration-count: infinite;
    }

    /*
    ** SNOW
    */
    @keyframes am-weather-snow {
      0% {
        -webkit-transform: translateX(0) translateY(0);
          -moz-transform: translateX(0) translateY(0);
            -ms-transform: translateX(0) translateY(0);
                transform: translateX(0) translateY(0);
      }

      33.33% {
        -webkit-transform: translateX(-1.2px) translateY(2px);
          -moz-transform: translateX(-1.2px) translateY(2px);
            -ms-transform: translateX(-1.2px) translateY(2px);
                transform: translateX(-1.2px) translateY(2px);
      }

      66.66% {
        -webkit-transform: translateX(1.4px) translateY(4px);
          -moz-transform: translateX(1.4px) translateY(4px);
            -ms-transform: translateX(1.4px) translateY(4px);
                transform: translateX(1.4px) translateY(4px);
        opacity: 1;
      }

      100% {
        -webkit-transform: translateX(-1.6px) translateY(6px);
          -moz-transform: translateX(-1.6px) translateY(6px);
            -ms-transform: translateX(-1.6px) translateY(6px);
                transform: translateX(-1.6px) translateY(6px);
        opacity: 0;
      }
    }

    .am-weather-snow-1 {
      -webkit-animation-name: am-weather-snow;
        -moz-animation-name: am-weather-snow;
          -ms-animation-name: am-weather-snow;
              animation-name: am-weather-snow;
      -webkit-animation-duration: 2s;
        -moz-animation-duration: 2s;
          -ms-animation-duration: 2s;
              animation-duration: 2s;
      -webkit-animation-timing-function: linear;
        -moz-animation-timing-function: linear;
          -ms-animation-timing-function: linear;
              animation-timing-function: linear;
      -webkit-animation-iteration-count: infinite;
        -moz-animation-iteration-count: infinite;
          -ms-animation-iteration-count: infinite;
              animation-iteration-count: infinite;
    }

    .am-weather-snow-2 {
      -webkit-animation-name: am-weather-snow;
        -moz-animation-name: am-weather-snow;
          -ms-animation-name: am-weather-snow;
              animation-name: am-weather-snow;
      -webkit-animation-delay: 1.2s;
        -moz-animation-delay: 1.2s;
          -ms-animation-delay: 1.2s;
              animation-delay: 1.2s;
      -webkit-animation-duration: 2s;
        -moz-animation-duration: 2s;
          -ms-animation-duration: 2s;
              animation-duration: 2s;
      -webkit-animation-timing-function: linear;
        -moz-animation-timing-function: linear;
          -ms-animation-timing-function: linear;
              animation-timing-function: linear;
      -webkit-animation-iteration-count: infinite;
        -moz-animation-iteration-count: infinite;
          -ms-animation-iteration-count: infinite;
              animation-iteration-count: infinite;
    }

            ]]></style>
        </defs>
        <g filter="url(#blur)" id="snowy-5">
            <g transform="translate(20,10)">
                <g class="am-weather-cloud-2">
                    <path d="M47.7,35.4c0-4.6-3.7-8.2-8.2-8.2c-1,0-1.9,0.2-2.8,0.5c-0.3-3.4-3.1-6.2-6.6-6.2c-3.7,0-6.7,3-6.7,6.7c0,0.8,0.2,1.6,0.4,2.3    c-0.3-0.1-0.7-0.1-1-0.1c-3.7,0-6.7,3-6.7,6.7c0,3.6,2.9,6.6,6.5,6.7l17.2,0C44.2,43.3,47.7,39.8,47.7,35.4z" fill="#57A0EE" stroke="white" stroke-linejoin="round" stroke-width="1.2" transform="translate(-20,-11)"/>
                </g>
                <g class="am-weather-snow-1">
                    <g transform="translate(7,28)">
                        <line fill="none" stroke="#57A0EE" stroke-linecap="round" stroke-width="1.2" transform="translate(0,9), rotate(0)" x1="0" x2="0" y1="-2.5" y2="2.5" />
                        <line fill="none" stroke="#57A0EE" stroke-linecap="round" stroke-width="1" transform="translate(0,9), rotate(45)" x1="0" x2="0" y1="-2.5" y2="2.5" />
                        <line fill="none" stroke="#57A0EE" stroke-linecap="round" stroke-width="1" transform="translate(0,9), rotate(90)" x1="0" x2="0" y1="-2.5" y2="2.5" />
                        <line fill="none" stroke="#57A0EE" stroke-linecap="round" stroke-width="1" transform="translate(0,9), rotate(135)" x1="0" x2="0" y1="-2.5" y2="2.5" />
                    </g>
                </g>
                <g class="am-weather-snow-2">
                    <g transform="translate(16,28)">
                        <line fill="none" stroke="#57A0EE" stroke-linecap="round" stroke-width="1.2" transform="translate(0,9), rotate(0)" x1="0" x2="0" y1="-2.5" y2="2.5" />
                        <line fill="none" stroke="#57A0EE" stroke-linecap="round" stroke-width="1" transform="translate(0,9), rotate(45)" x1="0" x2="0" y1="-2.5" y2="2.5" />
                        <line fill="none" stroke="#57A0EE" stroke-linecap="round" stroke-width="1" transform="translate(0,9), rotate(90)" x1="0" x2="0" y1="-2.5" y2="2.5" />
                        <line fill="none" stroke="#57A0EE" stroke-linecap="round" stroke-width="1" transform="translate(0,9), rotate(135)" x1="0" x2="0" y1="-2.5" y2="2.5" />
                    </g>
                </g>
            </g>
        </g>
    </svg>`,
  partlycloudy: `<?xml version="1.0" encoding="utf-8"?>
  <!-- (c) ammap.com | SVG weather icons -->
  <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      width="64"
      height="64"
      viewbox="0 0 64 64">
      <defs>
          <filter id="blur" width="200%" height="200%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
              <feOffset dx="0" dy="4" result="offsetblur"/>
              <feComponentTransfer>
                  <feFuncA type="linear" slope="0.05"/>
              </feComponentTransfer>
              <feMerge> 
                  <feMergeNode/>
                  <feMergeNode in="SourceGraphic"/> 
              </feMerge>
          </filter>
          <style type="text/css"><![CDATA[
  /*
  ** CLOUDS
  */
  @keyframes am-weather-cloud-2 {
    0% {
      -webkit-transform: translate(0px,0px);
        -moz-transform: translate(0px,0px);
          -ms-transform: translate(0px,0px);
              transform: translate(0px,0px);
    }

    50% {
      -webkit-transform: translate(2px,0px);
        -moz-transform: translate(2px,0px);
          -ms-transform: translate(2px,0px);
              transform: translate(2px,0px);
    }

    100% {
      -webkit-transform: translate(0px,0px);
        -moz-transform: translate(0px,0px);
          -ms-transform: translate(0px,0px);
              transform: translate(0px,0px);
    }
  }

  .am-weather-cloud-2 {
    -webkit-animation-name: am-weather-cloud-2;
      -moz-animation-name: am-weather-cloud-2;
            animation-name: am-weather-cloud-2;
    -webkit-animation-duration: 3s;
      -moz-animation-duration: 3s;
            animation-duration: 3s;
    -webkit-animation-timing-function: linear;
      -moz-animation-timing-function: linear;
            animation-timing-function: linear;
    -webkit-animation-iteration-count: infinite;
      -moz-animation-iteration-count: infinite;
            animation-iteration-count: infinite;
  }

  /*
  ** SUN
  */
  @keyframes am-weather-sun {
    0% {
      -webkit-transform: rotate(0deg);
        -moz-transform: rotate(0deg);
          -ms-transform: rotate(0deg);
              transform: rotate(0deg);
    }

    100% {
      -webkit-transform: rotate(360deg);
        -moz-transform: rotate(360deg);
          -ms-transform: rotate(360deg);
              transform: rotate(360deg);
    }
  }

  .am-weather-sun {
    -webkit-animation-name: am-weather-sun;
      -moz-animation-name: am-weather-sun;
        -ms-animation-name: am-weather-sun;
            animation-name: am-weather-sun;
    -webkit-animation-duration: 9s;
      -moz-animation-duration: 9s;
        -ms-animation-duration: 9s;
            animation-duration: 9s;
    -webkit-animation-timing-function: linear;
      -moz-animation-timing-function: linear;
        -ms-animation-timing-function: linear;
            animation-timing-function: linear;
    -webkit-animation-iteration-count: infinite;
      -moz-animation-iteration-count: infinite;
        -ms-animation-iteration-count: infinite;
            animation-iteration-count: infinite;
  }

  @keyframes am-weather-sun-shiny {
    0% {
      stroke-dasharray: 3px 10px;
      stroke-dashoffset: 0px;
    }

    50% {
      stroke-dasharray: 0.1px 10px;
      stroke-dashoffset: -1px;
    }

    100% {
      stroke-dasharray: 3px 10px;
      stroke-dashoffset: 0px;
    }
  }

  .am-weather-sun-shiny line {
    -webkit-animation-name: am-weather-sun-shiny;
      -moz-animation-name: am-weather-sun-shiny;
        -ms-animation-name: am-weather-sun-shiny;
            animation-name: am-weather-sun-shiny;
    -webkit-animation-duration: 2s;
      -moz-animation-duration: 2s;
        -ms-animation-duration: 2s;
            animation-duration: 2s;
    -webkit-animation-timing-function: linear;
      -moz-animation-timing-function: linear;
        -ms-animation-timing-function: linear;
            animation-timing-function: linear;
    -webkit-animation-iteration-count: infinite;
      -moz-animation-iteration-count: infinite;
        -ms-animation-iteration-count: infinite;
            animation-iteration-count: infinite;
  }
          ]]></style>
      </defs>
      <g filter="url(#blur)" id="cloudy-day-2">
          <g transform="translate(20,10)">
              <g transform="translate(0,16)">
                  <g class="am-weather-sun">
                      <g>
                          <line fill="none" stroke="orange" stroke-linecap="round" stroke-width="2" transform="translate(0,9)" x1="0" x2="0" y1="0" y2="3"/>
                      </g>
                      <g transform="rotate(45)">
                          <line fill="none" stroke="orange" stroke-linecap="round" stroke-width="2" transform="translate(0,9)" x1="0" x2="0" y1="0" y2="3"/>
                      </g>
                      <g transform="rotate(90)">
                          <line fill="none" stroke="orange" stroke-linecap="round" stroke-width="2" transform="translate(0,9)" x1="0" x2="0" y1="0" y2="3"/>
                      </g>
                      <g transform="rotate(135)">
                          <line fill="none" stroke="orange" stroke-linecap="round" stroke-width="2" transform="translate(0,9)" x1="0" x2="0" y1="0" y2="3"/>
                      </g>
                      <g transform="rotate(180)">
                          <line fill="none" stroke="orange" stroke-linecap="round" stroke-width="2" transform="translate(0,9)" x1="0" x2="0" y1="0" y2="3"/>
                      </g>
                      <g transform="rotate(225)">
                          <line fill="none" stroke="orange" stroke-linecap="round" stroke-width="2" transform="translate(0,9)" x1="0" x2="0" y1="0" y2="3"/>
                      </g>
                      <g transform="rotate(270)">
                          <line fill="none" stroke="orange" stroke-linecap="round" stroke-width="2" transform="translate(0,9)" x1="0" x2="0" y1="0" y2="3"/>
                      </g>
                      <g transform="rotate(315)">
                          <line fill="none" stroke="orange" stroke-linecap="round" stroke-width="2" transform="translate(0,9)" x1="0" x2="0" y1="0" y2="3"/>
                      </g>
                  </g>
                  <circle cx="0" cy="0" fill="orange" r="5" stroke="orange" stroke-width="2"/>
              </g>
              <g class="am-weather-cloud-2">
                  <path d="M47.7,35.4c0-4.6-3.7-8.2-8.2-8.2c-1,0-1.9,0.2-2.8,0.5c-0.3-3.4-3.1-6.2-6.6-6.2c-3.7,0-6.7,3-6.7,6.7c0,0.8,0.2,1.6,0.4,2.3    c-0.3-0.1-0.7-0.1-1-0.1c-3.7,0-6.7,3-6.7,6.7c0,3.6,2.9,6.6,6.5,6.7l17.2,0C44.2,43.3,47.7,39.8,47.7,35.4z" fill="#91C0F8" stroke="white" stroke-linejoin="round" stroke-width="1.2" transform="translate(-20,-11)"/>
              </g>
          </g>
      </g>
      
  </svg>`,
  windy: `<svg
    xmlns="http://www.w3.org/2000/svg"
    width="64"
    height="64"
    viewBox="0 0 64 64">

    <style>
      /* Cloud floating animation */
      @keyframes cloud-move {
        0% { transform: translateX(0); }
        50% { transform: translateX(5px); }
        100% { transform: translateX(0); }
      }

      .cloud {
        animation: cloud-move 6s linear infinite;
      }

      /* Wind gust animation */
      @keyframes wind {
        0%   { stroke-dashoffset: 60; }
        100% { stroke-dashoffset: 0; }
      }

      .wind line {
        stroke: #57A0EE;
        stroke-width: 2;
        stroke-linecap: round;
        stroke-dasharray: 30 30;
        animation: wind 2s linear infinite;
      }
    </style>

    <!-- Cloud -->
    <g class="cloud" transform="translate(12,10)">
      <path d="M47.7,35.4
        c0-4.6-3.7-8.2-8.2-8.2c-1,0-1.9,0.2-2.8,0.5
        c-0.3-3.4-3.1-6.2-6.6-6.2c-3.7,0-6.7,3-6.7,6.7
        c0,0.8,0.2,1.6,0.4,2.3
        c-0.3-0.1-0.7-0.1-1-0.1
        c-3.7,0-6.7,3-6.7,6.7
        c0,3.6,2.9,6.6,6.5,6.7l17.2,0
        C44.2,43.3,47.7,39.8,47.7,35.4z"
        fill="#91C0F8"
        stroke="white"
        stroke-width="1.2"/>
    </g>

    <!-- Wind Gusts -->
    <g class="wind" transform="translate(10,50)">
      <line x1="0" y1="0" x2="40" y2="0"/>
      <line x1="10" y1="8" x2="50" y2="8"/>
      <line x1="20" y1="16" x2="60" y2="16"/>
    </g>

  </svg>`,
  // Night variants
  "clear-night": `<?xml version="1.0" encoding="utf-8"?>
    <!-- (c) ammap.com | SVG weather icons -->
    <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        width="64"
        height="64"
        viewbox="0 0 64 64">
        <defs>
            <filter id="blur" width="200%" height="200%">
                <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
                <feOffset dx="0" dy="4" result="offsetblur"/>
                <feComponentTransfer>
                    <feFuncA type="linear" slope="0.05"/>
                </feComponentTransfer>
                <feMerge> 
                    <feMergeNode/>
                    <feMergeNode in="SourceGraphic"/> 
                </feMerge>
            </filter>
            <style type="text/css"><![CDATA[
    /*
    ** CLOUDS
    */
    @keyframes am-weather-cloud-1 {
      0% {
        -webkit-transform: translate(-5px,0px);
          -moz-transform: translate(-5px,0px);
            -ms-transform: translate(-5px,0px);
                transform: translate(-5px,0px);
      }

      50% {
        -webkit-transform: translate(10px,0px);
          -moz-transform: translate(10px,0px);
            -ms-transform: translate(10px,0px);
                transform: translate(10px,0px);
      }

      100% {
        -webkit-transform: translate(-5px,0px);
          -moz-transform: translate(-5px,0px);
            -ms-transform: translate(-5px,0px);
                transform: translate(-5px,0px);
      }
    }

    .am-weather-cloud-1 {
      -webkit-animation-name: am-weather-cloud-1;
        -moz-animation-name: am-weather-cloud-1;
              animation-name: am-weather-cloud-1;
      -webkit-animation-duration: 7s;
        -moz-animation-duration: 7s;
              animation-duration: 7s;
      -webkit-animation-timing-function: linear;
        -moz-animation-timing-function: linear;
              animation-timing-function: linear;
      -webkit-animation-iteration-count: infinite;
        -moz-animation-iteration-count: infinite;
              animation-iteration-count: infinite;
    }

    @keyframes am-weather-cloud-2 {
      0% {
        -webkit-transform: translate(0px,0px);
          -moz-transform: translate(0px,0px);
            -ms-transform: translate(0px,0px);
                transform: translate(0px,0px);
      }

      50% {
        -webkit-transform: translate(2px,0px);
          -moz-transform: translate(2px,0px);
            -ms-transform: translate(2px,0px);
                transform: translate(2px,0px);
      }

      100% {
        -webkit-transform: translate(0px,0px);
          -moz-transform: translate(0px,0px);
            -ms-transform: translate(0px,0px);
                transform: translate(0px,0px);
      }
    }

    .am-weather-cloud-2 {
      -webkit-animation-name: am-weather-cloud-2;
        -moz-animation-name: am-weather-cloud-2;
              animation-name: am-weather-cloud-2;
      -webkit-animation-duration: 3s;
        -moz-animation-duration: 3s;
              animation-duration: 3s;
      -webkit-animation-timing-function: linear;
        -moz-animation-timing-function: linear;
              animation-timing-function: linear;
      -webkit-animation-iteration-count: infinite;
        -moz-animation-iteration-count: infinite;
              animation-iteration-count: infinite;
    }

    /*
    ** SUN
    */
    @keyframes am-weather-sun {
      0% {
        -webkit-transform: rotate(0deg);
          -moz-transform: rotate(0deg);
            -ms-transform: rotate(0deg);
                transform: rotate(0deg);
      }

      100% {
        -webkit-transform: rotate(360deg);
          -moz-transform: rotate(360deg);
            -ms-transform: rotate(360deg);
                transform: rotate(360deg);
      }
    }

    .am-weather-sun {
      -webkit-animation-name: am-weather-sun;
        -moz-animation-name: am-weather-sun;
          -ms-animation-name: am-weather-sun;
              animation-name: am-weather-sun;
      -webkit-animation-duration: 9s;
        -moz-animation-duration: 9s;
          -ms-animation-duration: 9s;
              animation-duration: 9s;
      -webkit-animation-timing-function: linear;
        -moz-animation-timing-function: linear;
          -ms-animation-timing-function: linear;
              animation-timing-function: linear;
      -webkit-animation-iteration-count: infinite;
        -moz-animation-iteration-count: infinite;
          -ms-animation-iteration-count: infinite;
              animation-iteration-count: infinite;
    }

    @keyframes am-weather-sun-shiny {
      0% {
        stroke-dasharray: 3px 10px;
        stroke-dashoffset: 0px;
      }

      50% {
        stroke-dasharray: 0.1px 10px;
        stroke-dashoffset: -1px;
      }

      100% {
        stroke-dasharray: 3px 10px;
        stroke-dashoffset: 0px;
      }
    }

    .am-weather-sun-shiny line {
      -webkit-animation-name: am-weather-sun-shiny;
        -moz-animation-name: am-weather-sun-shiny;
          -ms-animation-name: am-weather-sun-shiny;
              animation-name: am-weather-sun-shiny;
      -webkit-animation-duration: 2s;
        -moz-animation-duration: 2s;
          -ms-animation-duration: 2s;
              animation-duration: 2s;
      -webkit-animation-timing-function: linear;
        -moz-animation-timing-function: linear;
          -ms-animation-timing-function: linear;
              animation-timing-function: linear;
      -webkit-animation-iteration-count: infinite;
        -moz-animation-iteration-count: infinite;
          -ms-animation-iteration-count: infinite;
              animation-iteration-count: infinite;
    }




    /*
    ** MOON
    */
    @keyframes am-weather-moon {
      0% {
        -webkit-transform: rotate(0deg);
          -moz-transform: rotate(0deg);
            -ms-transform: rotate(0deg);
                transform: rotate(0deg);
      }

      50% {
        -webkit-transform: rotate(15deg);
          -moz-transform: rotate(15deg);
            -ms-transform: rotate(15deg);
                transform: rotate(15deg);
      }

      100% {
        -webkit-transform: rotate(0deg);
          -moz-transform: rotate(0deg);
            -ms-transform: rotate(0deg);
                transform: rotate(0deg);
      }
    }

    .am-weather-moon {
      -webkit-animation-name: am-weather-moon;
        -moz-animation-name: am-weather-moon;
          -ms-animation-name: am-weather-moon;
              animation-name: am-weather-moon;
      -webkit-animation-duration: 6s;
        -moz-animation-duration: 6s;
          -ms-animation-duration: 6s;
              animation-duration: 6s;
      -webkit-animation-timing-function: linear;
        -moz-animation-timing-function: linear;
          -ms-animation-timing-function: linear;
              animation-timing-function: linear;
      -webkit-animation-iteration-count: infinite;
        -moz-animation-iteration-count: infinite;
          -ms-animation-iteration-count: infinite;
              animation-iteration-count: infinite;
      -webkit-transform-origin: 12.5px 15.15px 0; /* TODO FF CENTER ISSUE */
        -moz-transform-origin: 12.5px 15.15px 0; /* TODO FF CENTER ISSUE */
          -ms-transform-origin: 12.5px 15.15px 0; /* TODO FF CENTER ISSUE */
              transform-origin: 12.5px 15.15px 0; /* TODO FF CENTER ISSUE */
    }

    @keyframes am-weather-moon-star-1 {
      0% {
        opacity: 0;
      }

      100% {
        opacity: 1;
      }
    }

    .am-weather-moon-star-1 {
      -webkit-animation-name: am-weather-moon-star-1;
        -moz-animation-name: am-weather-moon-star-1;
          -ms-animation-name: am-weather-moon-star-1;
              animation-name: am-weather-moon-star-1;
      -webkit-animation-delay: 3s;
        -moz-animation-delay: 3s;
          -ms-animation-delay: 3s;
              animation-delay: 3s;
      -webkit-animation-duration: 5s;
        -moz-animation-duration: 5s;
          -ms-animation-duration: 5s;
              animation-duration: 5s;
      -webkit-animation-timing-function: linear;
        -moz-animation-timing-function: linear;
          -ms-animation-timing-function: linear;
              animation-timing-function: linear;
      -webkit-animation-iteration-count: 1;
        -moz-animation-iteration-count: 1;
          -ms-animation-iteration-count: 1;
              animation-iteration-count: 1;
    }

    @keyframes am-weather-moon-star-2 {
      0% {
        opacity: 0;
      }

      100% {
        opacity: 1;
      }
    }

    .am-weather-moon-star-2 {
      -webkit-animation-name: am-weather-moon-star-2;
        -moz-animation-name: am-weather-moon-star-2;
          -ms-animation-name: am-weather-moon-star-2;
              animation-name: am-weather-moon-star-2;
      -webkit-animation-delay: 5s;
        -moz-animation-delay: 5s;
          -ms-animation-delay: 5s;
              animation-delay: 5s;
      -webkit-animation-duration: 4s;
        -moz-animation-duration: 4s;
          -ms-animation-duration: 4s;
              animation-duration: 4s;
      -webkit-animation-timing-function: linear;
        -moz-animation-timing-function: linear;
          -ms-animation-timing-function: linear;
              animation-timing-function: linear;
      -webkit-animation-iteration-count: 1;
        -moz-animation-iteration-count: 1;
          -ms-animation-iteration-count: 1;
              animation-iteration-count: 1;
    }

    /*
    ** RAIN
    */
    @keyframes am-weather-rain {
      0% {
        stroke-dashoffset: 0;
      }

      100% {
        stroke-dashoffset: -100;
      }
    }

    .am-weather-rain-1 {
      -webkit-animation-name: am-weather-rain;
        -moz-animation-name: am-weather-rain;
          -ms-animation-name: am-weather-rain;
              animation-name: am-weather-rain;
      -webkit-animation-duration: 8s;
        -moz-animation-duration: 8s;
          -ms-animation-duration: 8s;
              animation-duration: 8s;
      -webkit-animation-timing-function: linear;
        -moz-animation-timing-function: linear;
          -ms-animation-timing-function: linear;
              animation-timing-function: linear;
      -webkit-animation-iteration-count: infinite;
        -moz-animation-iteration-count: infinite;
          -ms-animation-iteration-count: infinite;
              animation-iteration-count: infinite;
    }

    .am-weather-rain-2 {
      -webkit-animation-name: am-weather-rain;
        -moz-animation-name: am-weather-rain;
          -ms-animation-name: am-weather-rain;
              animation-name: am-weather-rain;
      -webkit-animation-delay: 0.25s;
        -moz-animation-delay: 0.25s;
          -ms-animation-delay: 0.25s;
              animation-delay: 0.25s;
      -webkit-animation-duration: 8s;
        -moz-animation-duration: 8s;
          -ms-animation-duration: 8s;
              animation-duration: 8s;
      -webkit-animation-timing-function: linear;
        -moz-animation-timing-function: linear;
          -ms-animation-timing-function: linear;
              animation-timing-function: linear;
      -webkit-animation-iteration-count: infinite;
        -moz-animation-iteration-count: infinite;
          -ms-animation-iteration-count: infinite;
              animation-iteration-count: infinite;
    }


    /*
    ** SNOW
    */
    @keyframes am-weather-snow {
      0% {
        -webkit-transform: translateX(0) translateY(0);
          -moz-transform: translateX(0) translateY(0);
            -ms-transform: translateX(0) translateY(0);
                transform: translateX(0) translateY(0);
      }

      33.33% {
        -webkit-transform: translateX(-1.2px) translateY(2px);
          -moz-transform: translateX(-1.2px) translateY(2px);
            -ms-transform: translateX(-1.2px) translateY(2px);
                transform: translateX(-1.2px) translateY(2px);
      }

      66.66% {
        -webkit-transform: translateX(1.4px) translateY(4px);
          -moz-transform: translateX(1.4px) translateY(4px);
            -ms-transform: translateX(1.4px) translateY(4px);
                transform: translateX(1.4px) translateY(4px);
        opacity: 1;
      }

      100% {
        -webkit-transform: translateX(-1.6px) translateY(6px);
          -moz-transform: translateX(-1.6px) translateY(6px);
            -ms-transform: translateX(-1.6px) translateY(6px);
                transform: translateX(-1.6px) translateY(6px);
        opacity: 0;
      }
    }

    @keyframes am-weather-snow-reverse {
      0% {
        -webkit-transform: translateX(0) translateY(0);
          -moz-transform: translateX(0) translateY(0);
            -ms-transform: translateX(0) translateY(0);
                transform: translateX(0) translateY(0);
      }

      33.33% {
        -webkit-transform: translateX(1.2px) translateY(2px);
          -moz-transform: translateX(1.2px) translateY(2px);
            -ms-transform: translateX(1.2px) translateY(2px);
                transform: translateX(1.2px) translateY(2px);
      }

      66.66% {
        -webkit-transform: translateX(-1.4px) translateY(4px);
          -moz-transform: translateX(-1.4px) translateY(4px);
            -ms-transform: translateX(-1.4px) translateY(4px);
                transform: translateX(-1.4px) translateY(4px);
        opacity: 1;
      }

      100% {
        -webkit-transform: translateX(1.6px) translateY(6px);
          -moz-transform: translateX(1.6px) translateY(6px);
            -ms-transform: translateX(1.6px) translateY(6px);
                transform: translateX(1.6px) translateY(6px);
        opacity: 0;
      }
    }

    .am-weather-snow-1 {
      -webkit-animation-name: am-weather-snow;
        -moz-animation-name: am-weather-snow;
          -ms-animation-name: am-weather-snow;
              animation-name: am-weather-snow;
      -webkit-animation-duration: 2s;
        -moz-animation-duration: 2s;
          -ms-animation-duration: 2s;
              animation-duration: 2s;
      -webkit-animation-timing-function: linear;
        -moz-animation-timing-function: linear;
          -ms-animation-timing-function: linear;
              animation-timing-function: linear;
      -webkit-animation-iteration-count: infinite;
        -moz-animation-iteration-count: infinite;
          -ms-animation-iteration-count: infinite;
              animation-iteration-count: infinite;
    }

    .am-weather-snow-2 {
      -webkit-animation-name: am-weather-snow;
        -moz-animation-name: am-weather-snow;
          -ms-animation-name: am-weather-snow;
              animation-name: am-weather-snow;
      -webkit-animation-delay: 1.2s;
        -moz-animation-delay: 1.2s;
          -ms-animation-delay: 1.2s;
              animation-delay: 1.2s;
      -webkit-animation-duration: 2s;
        -moz-animation-duration: 2s;
          -ms-animation-duration: 2s;
              animation-duration: 2s;
      -webkit-animation-timing-function: linear;
        -moz-animation-timing-function: linear;
          -ms-animation-timing-function: linear;
              animation-timing-function: linear;
      -webkit-animation-iteration-count: infinite;
        -moz-animation-iteration-count: infinite;
          -ms-animation-iteration-count: infinite;
              animation-iteration-count: infinite;
    }

    .am-weather-snow-3 {
      -webkit-animation-name: am-weather-snow-reverse;
        -moz-animation-name: am-weather-snow-reverse;
          -ms-animation-name: am-weather-snow-reverse;
              animation-name: am-weather-snow-reverse;
      -webkit-animation-duration: 2s;
        -moz-animation-duration: 2s;
          -ms-animation-duration: 2s;
              animation-duration: 2s;
      -webkit-animation-timing-function: linear;
        -moz-animation-timing-function: linear;
          -ms-animation-timing-function: linear;
              animation-timing-function: linear;
      -webkit-animation-iteration-count: infinite;
        -moz-animation-iteration-count: infinite;
          -ms-animation-iteration-count: infinite;
              animation-iteration-count: infinite;
    }

    /*
    ** EASING
    */
    .am-weather-easing-ease-in-out {
      -webkit-animation-timing-function: ease-in-out;
        -moz-animation-timing-function: ease-in-out;
          -ms-animation-timing-function: ease-in-out;
              animation-timing-function: ease-in-out;
    }

            ]]></style>
        </defs>
        <g filter="url(#blur)" id="night">
            <g transform="translate(20,20)">
                <g class="am-weather-moon-star-1">
                    <polygon fill="orange" points="3.3,1.5 4,2.7 5.2,3.3 4,4 3.3,5.2 2.7,4 1.5,3.3 2.7,2.7" stroke="none" stroke-miterlimit="10"/>
                </g>
                <g class="am-weather-moon-star-2">
                    <polygon fill="orange" points="3.3,1.5 4,2.7 5.2,3.3 4,4 3.3,5.2 2.7,4 1.5,3.3 2.7,2.7" stroke="none" stroke-miterlimit="10" transform="translate(20,10)"/>
                </g>
                <g class="am-weather-moon">
                    <path d="M14.5,13.2c0-3.7,2-6.9,5-8.7   c-1.5-0.9-3.2-1.3-5-1.3c-5.5,0-10,4.5-10,10s4.5,10,10,10c1.8,0,3.5-0.5,5-1.3C16.5,20.2,14.5,16.9,14.5,13.2z" fill="orange" stroke="orange" stroke-linejoin="round" stroke-width="2"/>
                </g>
            </g>
        </g>
    </svg>`,
}

const metricIcons = {
  humidity: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"><path d="M8 1C5 5 3 8 3 10a5 5 0 0 0 10 0c0-2-2-5-5-9z"/></svg>`,
  wind: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.50929 4.66667C9.8755 4.2575 10.4077 4 11 4C12.1046 4 13 4.89543 13 6C13 7.10457 12.1046 8 11 8H2.00002M12.5093 19.3333C12.8755 19.7425 13.4077 20 14 20C15.1046 20 16 19.1046 16 18C16 16.8954 15.1046 16 14 16H2.00002M16.7639 7C17.3132 6.38625 18.1115 6 19 6C20.6569 6 22 7.34315 22 9C22 10.6569 20.6569 12 19 12H2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  feels: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 16C7.44772 16 7 16.4477 7 17C7 17.5523 7.44772 18 8 18C8.55228 18 9 17.5523 9 17C9 16.4477 8.55228 16 8 16ZM8 16L8.00707 12M8 17L8.00707 17.0071M20 5C20 6.10457 19.1046 7 18 7C16.8954 7 16 6.10457 16 5C16 3.89543 16.8954 3 18 3C19.1046 3 20 3.89543 20 5ZM12 17C12 19.209 10.2091 21 8 21C5.79086 21 4 19.209 4 17C4 15.9854 4.37764 15.0591 5 14.354V6C5 4.34315 6.34315 3 8 3C9.65685 3 11 4.34315 11 6V14.354C11.6224 15.0591 12 15.9854 12 17Z"/></svg>',
  dew: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21.5C16.1012 21.5 19.5 18.4372 19.5 14.5714C19.5 12.1555 18.2672 9.71249 16.8732 7.70906C15.4698 5.69214 13.8515 4.04821 12.9778 3.21778C12.4263 2.69364 11.5737 2.69364 11.0222 3.21779C10.1485 4.04821 8.53016 5.69214 7.1268 7.70906C5.73282 9.71249 4.5 12.1555 4.5 14.5714C4.5 18.4372 7.8988 21.5 12 21.5Z"/><path d="M12 18C11.4747 18 10.9546 17.8965 10.4693 17.6955C9.98396 17.4945 9.54301 17.1999 9.17157 16.8284C8.80014 16.457 8.5055 16.016 8.30448 15.5307C8.10346 15.0454 8 14.5253 8 14"/></svg>`,
  pressure: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="12" r="10"/>
  <line x1="12" y1="12" x2="16" y2="8"/></svg>`,
  uv: `<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 32 32"><path d="M13,30H9a2.0027,2.0027,0,0,1-2-2V20H9v8h4V20h2v8A2.0027,2.0027,0,0,1,13,30Z"/><polygon points="25 20 23.25 20 21 29.031 18.792 20 17 20 19.5 30 22.5 30 25 20"/><rect x="15" y="2" width="2" height="5"/><rect x="21.6675" y="6.8536" width="4.958" height="1.9998" transform="matrix(0.7071,-0.7071,0.7071,0.7071,1.5191,19.3744)"/><rect x="25" y="15" width="5" height="2"/><rect x="2" y="15" width="5" height="2"/><rect x="6.8536" y="5.3745" width="1.9998" height="4.958" transform="matrix(0.7071,-0.7071,0.7071,0.7071,-3.253,7.8535)"/><path d="M22,17H20V16a4,4,0,0,0-8,0v1H10V16a6,6,0,0,1,12,0Z"/></svg>`,
  visibility: `<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 512 512"><path d="M256,170.688c-47.042,0-85.312,38.271-85.312,85.312s38.271,85.312,85.312,85.312s85.312-38.271,85.312-85.312S303.042,170.688,256,170.688z M256,304.75c-26.881,0-48.75-21.869-48.75-48.75s21.869-48.75,48.75-48.75s48.75,21.869,48.75,48.75S282.881,304.75,256,304.75z"/><path d="M256,0C114.615,0,0,114.615,0,256s114.615,256,256,256s256-114.615,256-256S397.385,0,256,0z M400.854,291.625c-22.381,32.303-76.545,98.438-144.854,98.438s-122.473-66.135-144.854-98.438C103.893,281.157,100,268.734,100,256s3.893-25.157,11.146-35.625c22.381-32.303,76.545-98.438,144.854-98.438s122.473,66.135,144.854,98.438C408.107,230.843,412,243.266,412,256S408.107,281.157,400.854,291.625z"/></svg>`,
}

const weatherIcon = computed(
  () => icons[props.entityData?.state] || icons["cloudy"]
)

const getIcon = (condition) => icons[condition] || icons["cloudy"]


// methods
const fetchForecast = (type = "daily") => {
  if (!props.entityData || !props.services?.get_forecasts) return

  const request = {
    platform: "weather",
    name: "get_forecasts",
    params: {
      entity_id: props.entityID,
      type: type
    }
  }

  // send via Vuex store
  store.commit("rws/setLaunch", JSON.stringify({ launch: request, tx: { tx_status: "pending" } }))
}

watch(
  () => store.state.robonomicsUIvue.rws.launch,
  (v) => {
    const resp = JSON.parse(v)
    // console.log(resp)
    if (resp?.launch?.params?.entity === props.entityData.entity_id && resp.launch.name === "get_forecasts") {
      const data = resp.launch.response
        if (data && data[props.entityID]?.forecast) {
          forecast.value = data[props.entityID].forecast.map(d => ({
            date: new Date(d.datetime).toLocaleDateString(),
            max: d.temperature ?? d.temperature_high ?? null,
            min: d.templow ?? d.temperature_low ?? null,
            state: d.condition
          }))
      } else {
        console.warn("Forecast request failed or pending", resp)
      }
    }
  }
)


// onMounted(async () => {
//   // fetchForecast("daily") 
//   console.log(props)
// })
</script>

<style scoped>
.weather-card {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.weather-header {
  display: flex;
  flex-direction: column;
  align-items: baseline;
}

.weather-main {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1rem;
}

.weather-icon > * {
  transform: scale(2);
  transform-origin: center;
}

.weather-state {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.weather-desc {
  font-size: 0.9rem;
  color: var(--robo-color-dark-60);
}

.weather-extra {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  line-height: 1.3;
  color: var(--robo-color-dark-70);
}

.weather-extra span {
  width: 16px;
  height: 16px;
  color: var(--robo-color-dark-70);
}

.weather-forecast {
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
}

.forecast-day {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 0.75rem;
}

.forecast-icon svg {
  width: 32px;
  height: 32px;
}

.forecast-temp {
  font-weight: bold;
}
</style>
