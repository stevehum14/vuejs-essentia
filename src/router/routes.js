export default [
{
  path: '/auth/register',
  name: 'register',
  component: ()=>import('@/views/auth/register')
},
{
  path: '/',
  name: 'Home',
  component: ()=>import('@/views/Home')
},
{
  path: '*',
  redirect: '/'
},
{
  path: '/auth/login',
  name: 'Login',
  component: ()=>import('@/views/auth/Login')
}
]
