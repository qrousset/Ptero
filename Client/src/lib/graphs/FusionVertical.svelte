<script>
	import FusionCharts from 'fusioncharts';
	import Charts from 'fusioncharts/fusioncharts.charts';
	import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
	import SvelteFC, { fcRoot } from 'svelte-fusioncharts';
	// import dataSource from './data.js';

	const dataSource = {
		chart: {
			caption: 'Countries With Most Oil Reserves [2017-18]',
			subCaption: 'In MMbbl = One Million barrels',
			xAxisName: 'Country',
			yAxisName: 'Reserves (MMbbl)',
			numberSuffix: 'K',
			theme: 'fusion'
		},
		data: [
			{
				label: 'Venezuela',
				value: '290'
			},
			{
				label: 'Saudi',
				value: '260'
			},
			{
				label: 'Canada',
				value: '180'
			},
			{
				label: 'Iran',
				value: '140'
			},
			{
				label: 'Russia',
				value: '115'
			},
			{
				label: 'UAE',
				value: '100'
			},
			{
				label: 'US',
				value: '30'
			},
			{
				label: 'China',
				value: '30'
			}
		]
	};

	fcRoot(FusionCharts, Charts, FusionTheme);

	const chartConfigs = {
		type: 'column2d',
		width: '600',
		height: '400',
		dataFormat: 'json',
		dataSource
	};
</script>

<div id="container">
	<SvelteFC {...chartConfigs} />
</div>
