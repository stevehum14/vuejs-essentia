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
},
  //编辑资料路由
{
  path: '/users/1/edit',
  component: ()=>import('@/views/users/Edit.vue'),
  children:[
    {
      path:'',
      name:'EditProfile',
      // auth 为 true，标识当前路由需要登录才能访问
      component:()=>import('@/views/users/Profile.vue'),
      meta:{auth:true}
    },
    //EditAvatar
    {
      path:'/users/1/edit_avatar',
      name:'EditAvatar',
      component:()=>import('@/views/users/Avatar.vue'),
      meta:{auth:true}
    }
  ]
}
]
