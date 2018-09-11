<template>
<div class="waa">
  <div v-if="mode == 'create'">
    <h3>新增短網址</h3>
    <a href="/tools/waa/edit"><el-button type="primary" class="right-top-button">編輯短網址</el-button></a>
    <el-form :label-width="labelWidth" label-position="left">
      <el-form-item v-for="field in waaConfig.createFields" :key="field.id" :label="field.label" >
        <el-input v-model="createData[field.id]"></el-input>
      </el-form-item>
      <el-button type="primary" @click="createNew()">新增</el-button>  
    </el-form>
    <div v-if="createStatus == 'success'" class="success">
      <p>短網址: <a target="_blank" :href="createdUrl">{{createdUrl}}</a></p>
      <el-button type="primary" @click="editIt()">編輯</el-button>
    </div>
    <p v-if="createStatus == 'fail'" class="error">生成失敗，請洽工程師</p>

  </div>
  <div v-if="mode == 'edit'">
    <h3>編輯短網址</h3>
    <el-form :label-width="labelWidth" label-position="left">
      <el-form-item v-for="field in ['Hash']" :key="field" :label="field" >
        <el-input v-model="hash"></el-input>
        <p v-if="invalidHash" class="error">無效的hash</p>
      </el-form-item>
      <el-form-item v-for="field in waaConfig.fields" :key="field.id" :label="field.label" >
        <p v-if="field.type == 'string'">{{data[field.id]}}</p>
        <el-input v-if="field.type == 'text-area'" type="textarea" v-model="data[field.id]"></el-input>
        <el-input v-if="field.type == 'input'" v-model="data[field.id]"></el-input>
        <image-selector v-if="field.type == 'image'" :value.sync="data[field.id]"></image-selector>
        <el-select v-if="field.type == 'select'" v-model="data[field.id]" placeholder="Select">
            <el-option v-for="item in waaConfig[field.optionName]" :key="item" :label="item" :value="item"></el-option>
        </el-select>
      </el-form-item>
      <el-button type="primary" @click="save()">更新</el-button>
    </el-form>
  </div>
</div>
</template>

<script>
import axios from 'axios'
import waaConfig from '@/config/waa'
import { labelWidth } from '@/util/element'
import ImageSelector from './ImageSelector'

let imageUploadSetting = {
  headers: {
    'watchout-auth': localStorage['watchout-token'],
    'Content-Type': 'application/json'
  }
}

export default {
  name: 'waa',
  data() {
    return {
      hash: '',
      data: {},
      mode: 'edit',
      waaConfig,
      createData: {
        url: ''
      },
      createStatus: '',
      createdUrl: '',
      invalidHash: false
    }
  },
  watch: {
    hash: function(val) {
      this.loadDetail()
    }
  },
  computed: {
    labelWidth() {
      return labelWidth(10)
    }
  },
  mounted() {
    this.determineMode()
  },
  methods: {
    determineMode() {
      let lastname = this.$route.path.split('/').pop()
      if(lastname === 'waa') {
        this.mode = 'create'
      }else {
        this.mode = 'edit'
      }
    },
    editIt() {
      this.mode = 'edit'
      this.hash = this.createdUrl.split('/').pop()
    },
    async createNew() {
      this.createStatus = ''
      try{
        let result = await axios.post(`${waaConfig.apiUrl}${waaConfig.createAPI.url}`, this.createData)
        this.createdUrl = result.data.url
        this.createStatus = 'success'
      }catch(e) {
        console.log(e)
        this.createStatus = 'fail'
      }
    },
    async loadDetail() {
      try {
        let detail = await axios[waaConfig.detailAPI.method](`${waaConfig.apiUrl}${waaConfig.detailAPI.url}${this.hash}`)
        this.data = detail.data.data
        this.invalidHash = false
      }catch(e) {
        console.log(e)
        this.data = {}
        this.invalidHash = true
      }
    },
    async save() {
      try {
        for(let target of ['openGraphImage', 'twitterImage']) {
          let image = this.data[target]
          if(image.slice(0, 10) === 'data:image') {
            let imageUploadResult = await axios.post(`${waaConfig.uploadImageAPI.url}`, {image: image.slice(image.indexOf('base64') + 6, image.length)}, imageUploadSetting)
            this.data[target] = imageUploadResult.data.image
          }
        }
        let result = await axios.post(`${waaConfig.apiUrl}${waaConfig.updateAPI.url}/${this.hash}`, this.data)
        if(result.status === 200) {
          alert('更新成功')
        }
      }catch(e) {
        console.log(e)
      }
    }
  },
  components: {
    ImageSelector
  }
}
</script>

<style lang="scss">
@import '~common/src/styles/resources';

.waa {
  margin: 1rem;
  position: relative;
  .right-top-button {
    position: absolute;
    right: 0;
    top: 0;
  }
  h3 {
    margin-bottom: 20px;
  }
  a {
    cursor: pointer;
  }
  .success {
    padding-top: 20px;
  }
  .error {
    color: red;
    margin: 0;
  }
}
</style>
