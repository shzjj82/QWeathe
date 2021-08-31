import { onMounted, ref } from "vue"

export default (props) => {
  const locationInfo = ref([]);
  const key = "d906c9473b74466f88deeedc4e0372b6"
  const { location = "上海" } = props
  const getLocation = async () => {
    const response = await fetch(`https://geoapi.qweather.com/v2/city/lookup?location=${location}&key=${key}`)
    const data = await response.json()
    locationInfo.value = data.location
  }

  const getWeatherInfo = async(location)=>{
    const response = await fetch(`https://devapi.qweather.com/v7/weather/now?location=${location}&key=${key}`)
    const data = await response.json();
    console.log(data)
    return data.now
  }

  onMounted(getLocation)
  return {
    locationInfo,
    getWeatherInfo
  }
}
