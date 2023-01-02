import Cookies from 'universal-cookie'

function setCookies(name,value) {
  const cookies=new Cookies()
  cookies.set(name,value,{path:'/'})
};

export default setCookies