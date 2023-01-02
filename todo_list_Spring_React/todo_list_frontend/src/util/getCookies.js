import Cookies from 'universal-cookie'

function setCookies(name,value) {
  const cookies=new Cookies()
  cookies.get(name,value)
};

export default setCookies