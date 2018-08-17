export default {
  apiUrl: 'https://waa.tw',
  hashLength: 6,
  detailAPI: {
    method: 'post',
    url: '/detail/'
  },
  createAPI: {
    url: '/create'
  },
  updateAPI: {
    url: '/update'
  },
  openGraphType: [
    'article',
    'book',
    'books.author',
    'books.genre',
    'business.business',
    'fitness.course',
    'game.achievement',
    'music.album',
    'music.playlist',
    'music.radio_station',
    'music.song',
    'place',
    'product',
    'product.group',
    'product.item',
    'profile',
    'restaurant.menu',
    'restaurant.menu_item',
    'restaurant.menu_section',
    'restaurant.restaurant',
    'video.episode',
    'video.movie',
    'video.other',
    'video.tv_show'
  ],
  twitterCard: [
    'summary',
    'summary_large_image',
    'app',
    'player'
  ],
  createFields: [
    {
      id: 'url',
      label: '目標網址'
    }
  ],
  fields: [
    {
      id: 'target',
      label: '目標網址',
      type: 'string'
    },
    {
      id: 'description',
      label: 'Description',
      type: 'text-area'
    },
    {
      id: 'openGraphTitle',
      label: 'FB Title',
      type: 'input'
    },
    {
      id: 'openGraphDescription',
      label: 'FB Description',
      type: 'text-area'
    },
    {
      id: 'openGraphType',
      label: 'FB type',
      type: 'select',
      optionName: 'openGraphType'
    },
    {
      id: 'openGraphImage',
      label: 'FB Image',
      type: 'image'
    },
    {
      id: 'twitterTitle',
      label: 'twitter Title',
      type: 'input'
    },
    {
      id: 'twitterDescription',
      label: 'twitter Description',
      type: 'text-area'
    },
    {
      id: 'twitterCard',
      label: 'twitter Card',
      type: 'select',
      optionName: 'twitterCard'
    },
    {
      id: 'twitterImage',
      label: 'twitter type',
      type: 'image'
    }
  ]
}
