## TODO

其实，整个分为两部分比较好

components 里面就 commentInput 和 commentList 两个组件，前者负责评论信息的输入，后者负责评论信息的展示。

containers 里面对应者两个组件。

点击发布，addComments
随之，List 更新，List 拿到整个 state.comments，结构如下

```js
state.comments = [
  {
    username: 'curry',
    email: 'example@qq.com',
    header: '....',
    content: 'hello world',
    children: []
  },
  {
    username: 'curry1',
    email: 'example1@qq.com',
    header: '....',
    content: 'hello world',
    children: [
      {
        username: 'curry_reply',
        email: 'example_reply@qq.com',
        header: '....',
        content: 'hello world',
        children: [], // 这里有两种方案，你可以设计子评论不再有 children，所有的子评论都放在当前的父评论下，或者所有的子评论都继续嵌套子评论。第一种好一些。
        assign: '' // 如果是第一种，还应该设计一个字段，来表示这条评论指向哪一个 username
      },
      {
        username: 'curry_reply2',
        email: 'example_reply2@qq.com',
        header: '....',
        content: 'hello world',
      }
    ]
  }
]
```

List 拿到这样的数据，进行递归渲染，如果有 children，在循环一次 children。
