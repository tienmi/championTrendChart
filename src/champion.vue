<script setup>
import { ref, onMounted, watch } from 'vue';
import { formatChampionData } from './format';
import { drawTable } from './canvas';

const props = defineProps({
    data: Array,
    type: Number
});

const canvasRef = ref(null);

onMounted(() => {
    const newData = formatChampionData(props.data);
    const canvas = canvasRef.value;
    drawTable(canvas, newData, props.type);
});

watch(
    () => props.data,
    () => {
        const newData = formatChampionData(props.data);
        const canvas = canvasRef.value;
        drawTable(canvas, newData, props.type);
    },
    { deep: true }
);
</script>

<template>
    <canvas ref="canvasRef" width="1240"></canvas>
</template>
