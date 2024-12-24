window.sheetVChart = {
    "name": "VChart",
    "status": 0,
    "index": "sheet_index",
    "celldata": [{
        "r": 0,
        "c": 0,
        "v": {
            "v": 'A',
            "m": "A",
        }
    }, {
        "r": 0,
        "c": 1,
        "v": {
            "v": "1",

            "m": "1",
        }
    }, {
        "r": 1,
        "c": 0,
        "v": {
            "v": "B",
            "m": "B",
        }
    }, {
        "r": 1,
        "c": 1,
        "v": {
            "v": 55,
            "m": "55",

        }
    },],
    "row": 84,
    "column": 60,
    "pivotTable": null,
    "isPivotTable": false,
    "ch_width": 4560,
    "rh_height": 1807,
    "vchart": [
        {
            "chart_id": "chart_p145W6i73otw_1596209943446",
            "width": 400,
            "height": 250,
            "left": 0,
            "top": 0,
            "sheetIndex": "Sheet_6az6nei65t1i_1596209937084",
            "needRangeShow": true,
            "chartOptions": {
                "chart_id": "chart_p145W6i73otw_1596209943446",
                "rangeArray": [{
                    "row": [0, 1],
                    "column": [0, 1]
                }],
                "rangeSplitArray": {
                    "title": {
                        "row": [0, 0],
                        "column": [0, 0]
                    },
                    "rowtitle": {
                        "row": [0, 0],
                        "column": [1, 7]
                    },
                    "coltitle": {
                        "row": [1, 4],
                        "column": [0, 0]
                    },
                    "content": {
                        "row": [1, 4],
                        "column": [1, 7]
                    },
                    "type": "normal",
                    "range": {
                        "row": [0, 1],
                        "column": [0, 1]
                    }
                },
                "rangeRowCheck": {
                    "exits": true,
                    "range": [0, 0]
                },
                "rangeColCheck": {
                    "exits": true,
                    "range": [0, 0]
                },
                data: [
                    {
                        id: 'barData',
                        values: [
                            { month: 'Monday', sales: 22 },
                            { month: 'Tuesday', sales: 13 },
                            { month: 'Wednesday', sales: 25 },
                            { month: 'Thursday', sales: 29 },
                            { month: 'Friday', sales: 38 }
                        ]
                    }
                ],
                type: 'bar',
                xField: 'month',
                yField: 'sales'
            }
        }
    ],
}

// export default sheetChart