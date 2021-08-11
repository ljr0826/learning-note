<template>
  <div class="date-picker" v-click-outside>
    <div class="picker-input">
      <span class="input-prefix">
        <i class="iconfont icon-date"></i>
      </span>
      <input type="text" :value="chooseDate" />
    </div>
    <div class="picker-panel" v-show="showPanel">
      <div class="picker-arrow" />
      <div class="picker-body">
        <div class="picker-header">
          <span class="picker-btn iconfont icon-prev-year" />
          <span class="picker-btn iconfont  icon-prev-month" />
          <span class="picker-data"
            >{{ showDate.year }}年{{ showDate.month + 1 }}月</span
          >
          <span class="picker-btn iconfont  icon-next-month" />
          <span class="picker-btn iconfont  icon-next-year" />
        </div>
        <div class="picker-content">
          <div class="picker-weeks">
            <div
              v-for="week in ['日', '一', '二', '三', '四', '五', '六']"
              :key="week"
            >
              {{ week }}
            </div>
          </div>
          <div class="picker-days">
            <div class="" v-for="date in 42" :key="date">
              {{ date }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//若打开文件时，文件名不是App.vue,那么在命令行应输入vue serve 文件名字
export default {
  directives: {
    "click-outside": {
      bind(el, binging, vnode) {
        const vm = vnode.context;
        document.onclick = function(e) {
          const dom = e.target;
          const isElSon = el.contains(dom);
          if (isElSon && !vm.showPanel) {
            vm.changePanel(true);
          } else if (!isElSon && vm.showPanel) {
            vm.changePanel(false);
          }
        };
      }
    }
  },
  data() {
    return {
      showPanel: false,
      showDate: {
        year: 0,
        month: 0,
        day: 0
      }
    };
  },
  props: {
    date: {
      type: Date,
      dafault: () => new Date()
    }
  },
  methods: {
    getYearMonthDay(date) {
      const year = date.getFullYear();
      const month = date.getMonth();
      const day = date.getDate();
      return {
        year,
        month,
        day
      };
    },
    changePanel(flag) {
      this.showPanel = flag;
    },
    getShowDate(date) {
      const { year, month, day } = this.getYearMonthDay(date);
      this.showDate = {
        year,
        month,
        day
      };
    }
  },
  computed: {
    chooseDate() {
      const { year, month, day } = this.getYearMonthDay(this.date);
      return `${year}-${month + 1}-${day}`;
    }
  },
  created() {
    this.getShowDate();
  }
};
</script>

<style scoped>
@import "./assets/font.css";
.date-picker {
  display: inline-block;
  /* background-color: tomato; */
}
.picker-input {
  position: relative;
}
.picker-input .input-prefix {
  position: absolute;
  left: 5px;
  width: 25px;
  height: 100%;
  line-height: 40px;
  text-align: center;
  color: #c0c4cc;
}
.picker-input input {
  height: 40px;
  line-height: 40px;
  padding: 0 30px;
  border: 1px solid #dcdfe6;
  background-color: #fff;
  border-radius: 4px;
  outline: none;
  cursor: pointer;
}
.picker-panel {
  position: absolute;
  width: 322px;
  height: 329px;
  margin-top: 5px;
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  background-color: #fff;
}
.picker-panel .picker-arrow {
  position: absolute;
  top: -12px;
  left: 30px;
  width: 0;
  height: 0;
  border: 6px solid transparent;
  border-bottom-color: #e4e7ed;
}
.picker-panel .picker-arrow::after {
  position: absolute;
  top: -5px;
  left: -6px;
  content: "";
  display: block;
  width: 0;
  height: 0;
  border: 6px solid transparent;
  border-bottom-color: #fff;
}
.picker-panel .picker-header {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px 0 10px 0;
}
.picker-panel .picker-btn {
  margin: 0 5px;
  font-size: 12px;
  color: #303133;
  cursor: pointer;
}
.picker-panel .picker-data {
  margin: 0 60px;
  font-size: 14px;
  -webkit-user-select: none;
}
.picker-panel .picker-content {
  padding: 0 10px 10px 10px;
  color: #606266;
  user-select: none;
}
.picker-panel .picker-weeks {
  display: flex;
  justify-content: space-around;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #ebeef5;
}
.picker-panel .picker-days {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.picker-panel .picker-days div {
  width: 30px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  margin: 4px 6px;
  font-size: 12px;
  cursor: pointer;
}
.picker-panel .picker-days div:hover {
  color: #409eff;
}
.picker-panel .picker-days div.is-today {
  color: #409eff;
  font-weight: 700;
}
.picker-panel .picker-days div.is-select {
  background-color: #409eff;
  color: #fff;
  border-radius: 50%;
}
.picker-panel .picker-days div.other-month {
  color: #c0c4cc;
}
</style>