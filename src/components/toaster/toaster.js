import toast from "react-hot-toast"

export const processSuccess = (data) => toast.success(data, {
  duration: 4000,
  position: 'bottom-right',
  icon: '👏'
})

export const processError = (data) => toast.error(data, {
  duration: 4000,
  position: 'bottom-right',
  icon: '⚠️'
})