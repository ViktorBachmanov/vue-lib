<script setup></script>

<template>
  <div>
    <table>
      <thead>
        <tr>
          <th>Пн</th>
          <th>Вт</th>
          <th>Ср</th>
          <th>Чт</th>
          <th>Пт</th>
          <th>Сб</th>
          <th>Вс</th>
        </tr>
      </thead>
    </table>
  </div>
</template>

<style scoped>
th, td {
  border: 0.5px solid;
  padding: 0.25em
}

:nth-child(6), :nth-child(7) {
  background-color: rgb(98, 18, 68);
} 
</style>
