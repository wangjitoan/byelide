<script setup lang="ts">
import { computed, ref, shallowRef } from 'vue'

interface DataSource {
  id: number
  name: string
  type: 'MySQL' | 'PostgreSQL' | 'API' | 'CSV' | 'MongoDB'
  status: 'connected' | 'disconnected' | 'error'
  url: string
  updatedAt: string
}

const dataSources = ref<DataSource[]>([
  { id: 1, name: 'User Database', type: 'MySQL', status: 'connected', url: 'mysql://db.internal:3306/users', updatedAt: '2026-05-12 10:30' },
  { id: 2, name: 'Analytics DB', type: 'PostgreSQL', status: 'connected', url: 'pg://db.internal:5432/analytics', updatedAt: '2026-05-12 09:15' },
  { id: 3, name: 'Payment API', type: 'API', status: 'error', url: 'https://api.payments.com/v2', updatedAt: '2026-05-11 23:00' },
  { id: 4, name: 'Log Archive', type: 'CSV', status: 'disconnected', url: '/data/archives/logs-2026.csv', updatedAt: '2026-05-10 18:45' },
  { id: 5, name: 'Inventory DB', type: 'MongoDB', status: 'connected', url: 'mongodb://db.internal:27017/inventory', updatedAt: '2026-05-12 11:00' },
])

const searchQuery = shallowRef('')

const typeFilter = shallowRef('')

const typeOptions = ['', 'MySQL', 'PostgreSQL', 'API', 'CSV', 'MongoDB'] as const

const filteredSources = computed(() => {
  let result = dataSources.value

  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase()
    result = result.filter(
      ds => ds.name.toLowerCase().includes(q) || ds.url.toLowerCase().includes(q),
    )
  }

  if (typeFilter.value) {
    result = result.filter(ds => ds.type === typeFilter.value)
  }

  return result
})

const statusLabel = computed(() => (status: DataSource['status']) => {
  const map: Record<DataSource['status'], string> = {
    connected: '已连接',
    disconnected: '已断开',
    error: '异常',
  }
  return map[status]
})
</script>

<template>
  <div class="datasource">
    <div class="datasource-header">
      <h1 class="datasource-title">Data Sources</h1>
      <span class="datasource-count">{{ filteredSources.length }} / {{ dataSources.length }} 个数据源</span>
    </div>

    <div class="datasource-toolbar">
      <input
        v-model="searchQuery"
        type="text"
        class="datasource-search"
        placeholder="搜索数据源名称或 URL..."
      />
      <select v-model="typeFilter" class="datasource-filter">
        <option value="">全部类型</option>
        <option v-for="t in typeOptions.slice(1)" :key="t" :value="t">{{ t }}</option>
      </select>
    </div>

    <div class="datasource-table-wrapper">
      <table class="datasource-table">
        <thead>
          <tr>
            <th>名称</th>
            <th>类型</th>
            <th>状态</th>
            <th>URL</th>
            <th>更新时间</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="filteredSources.length === 0">
            <td colspan="5" class="datasource-empty">暂无匹配的数据源</td>
          </tr>
          <tr v-for="source in filteredSources" :key="source.id">
            <td class="datasource-name">{{ source.name }}</td>
            <td>
              <span class="datasource-type-tag">{{ source.type }}</span>
            </td>
            <td>
              <span :class="['datasource-status', `datasource-status--${source.status}`]">
                {{ statusLabel(source.status) }}
              </span>
            </td>
            <td class="datasource-url">{{ source.url }}</td>
            <td class="datasource-time">{{ source.updatedAt }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.datasource {
  padding: 24px;
}

.datasource-header {
  display: flex;
  align-items: baseline;
  gap: 16px;
  margin-bottom: 20px;
}

.datasource-title {
  margin: 0;
  font-size: 24px;
  font-weight: 600;
}

.datasource-count {
  color: #888;
  font-size: 14px;
}

.datasource-toolbar {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
}

.datasource-search {
  flex: 1;
  max-width: 360px;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s;
}

.datasource-search:focus {
  border-color: #4a90d9;
}

.datasource-filter {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  outline: none;
  background: #fff;
  cursor: pointer;
}

.datasource-table-wrapper {
  border: 1px solid #eee;
  border-radius: 8px;
  overflow: hidden;
}

.datasource-table {
  width: 100%;
  border-collapse: collapse;
}

.datasource-table th {
  padding: 12px 16px;
  text-align: left;
  font-size: 13px;
  font-weight: 600;
  color: #666;
  background: #f8f9fa;
  border-bottom: 1px solid #eee;
}

.datasource-table td {
  padding: 12px 16px;
  font-size: 14px;
  border-bottom: 1px solid #f5f5f5;
}

.datasource-table tbody tr:last-child td {
  border-bottom: none;
}

.datasource-table tbody tr:hover {
  background: #fafbfc;
}

.datasource-name {
  font-weight: 500;
}

.datasource-type-tag {
  display: inline-block;
  padding: 2px 8px;
  font-size: 12px;
  color: #555;
  background: #f0f0f0;
  border-radius: 4px;
}

.datasource-url {
  color: #888;
  font-size: 13px;
  max-width: 280px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.datasource-time {
  color: #888;
  font-size: 13px;
  white-space: nowrap;
}

.datasource-status {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
}

.datasource-status::before {
  content: '';
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.datasource-status--connected {
  color: #2e7d32;
}

.datasource-status--connected::before {
  background: #4caf50;
}

.datasource-status--disconnected {
  color: #888;
}

.datasource-status--disconnected::before {
  background: #bbb;
}

.datasource-status--error {
  color: #c62828;
}

.datasource-status--error::before {
  background: #ef5350;
}

.datasource-empty {
  text-align: center;
  padding: 40px 16px !important;
  color: #aaa;
  font-size: 14px;
}
</style>
