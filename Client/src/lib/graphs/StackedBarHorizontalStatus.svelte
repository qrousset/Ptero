<script>
	import * as Pancake from '@sveltejs/pancake';

	export let split = [];
	export let splitColors = [];
	export let data;
	let stacks;
	let max;

	let totals = [];

	data.subscribe((value) => {
		totals = value.slice(0, 10);
		stacks = Pancake.stacks(totals, split, 'id');
		max = stacks.reduce((max, stack) => Math.max(max, ...stack.values.map((v) => v.end)), 0);
	});
</script>

<div class="chart">
	<Pancake.Chart x1={0} x2={max} y1={0.5} y2={6.5}>
		<Pancake.Grid horizontal count={totals.length} let:value let:first>
			<div class="grid-line horizontal"><span>{totals[6 - value]['status']}</span></div>
		</Pancake.Grid>

		<Pancake.Grid vertical count={8} let:value>
			<div class="grid-line vertical" />
			<span class="x-label">{value}</span>
		</Pancake.Grid>
		{#each stacks as stack, i}
			{#each stack.values as d}
				<Pancake.Box x1={d.start} x2={d.end} y1={7 - d.i - 0.5} y2={7 - d.i + 0.5}>
					<div class="box" style="background-color: {splitColors[i]}" />
				</Pancake.Box>
			{/each}
		{/each}
	</Pancake.Chart>
</div>

<style>
	.chart {
		height: 100%;
		padding: 0em 0em 3em 3em;
		margin: 0 0 36px 0;
	}

	.grid-line {
		position: relative;
		display: block;
	}

	.grid-line.horizontal {
		width: calc(100% + 3em);
		left: -3em;
		/* display: flex; */
		/* border-top: 1px dashed #ccc; */
	}

	.grid-line.vertical {
		height: 100%;
		border-left: 1px dashed #ccc;
	}

	.grid-line span {
		position: absolute;
		left: 0;
		bottom: -0.5em;
		font-family: sans-serif;
		font-size: 1em;
		color: #999;
		line-height: 1;
		width: 11em;
		overflow-wrap: break-word;
		/* text-align:right; */
	}

	.x-label {
		position: absolute;
		width: 4em;
		left: -2em;
		bottom: -22px;
		font-family: sans-serif;
		font-size: 14px;
		color: #999;
		text-align: center;
	}

	.box {
		position: absolute;
		left: 0;
		top: 2px;
		width: 100%;
		height: calc(100% - 4px);
		border-radius: 2px;
	}
</style>
