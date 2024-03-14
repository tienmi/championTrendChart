/**
 *
 * @param {Canvas Ref} canvas
 * @param {format data} newData
 * @param {number} type
 *
 * type for trend ranking
 */

export const drawTable = (
    canvas,
    newData,
    type = 1,
    issueTitle,
    trendTitle
) => {
    const ctx = canvas.getContext('2d');

    // Init setting
    const startX = 0;
    const startY = 0;
    const issueSize = 240;
    const headHeight = 200;
    const columns = 10;
    const columnWidth = 100;
    const columnHeignt = 100;
    const layerBg = '#F5F5F5';
    const defaultBg = '#fff';
    const notWinBg = '#E7E7E7';
    const extraField = [
        { title: '出现总次数', value: 'total' },
        { title: '平均遗漏值', value: 'averageMissing' },
        { title: '最大遗漏值', value: 'maxMissing' },
        { title: '最大连出值', value: 'maxContinuous' }
    ];
    const textColor = '#63666F';
    const extraColor = '#1E8EF5';
    const contentSize = '40px';
    const lineWidth = 2;
    const lineColor = 'rgba(0, 0, 0, 0.10)';
    const winningPosition = {};

    canvas.height =
        headHeight +
        columnHeignt * newData.issue.length +
        columnHeignt * extraField.length;

    const drawColumn = ({
        text,
        width,
        height,
        x,
        y,
        bgColor = '#fff',
        fontSize = '56px',
        heighlight = false,
        fieldIndex,
        color = textColor,
        fontWeight = '400'
    }) => {
        // Draw column
        ctx.beginPath();
        ctx.rect(x, y, width, height);
        ctx.fillStyle = bgColor;
        ctx.fill();

        // Draw border
        ctx.beginPath();
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = lineColor;
        ctx.moveTo(x + width - 0.5, y);
        ctx.lineTo(x + width - 0.5, y + height - 0.5);
        ctx.lineTo(x, y + height - 0.5);
        ctx.stroke();

        // Draw heighlight
        const drawHeighlight = () => {
            ctx.beginPath();
            const circleRadius = 40;
            ctx.fillStyle = '#F24848';
            const position = {
                x: x + columnWidth / 2,
                y: y + columnHeignt / 2,
                text
            };
            ctx.arc(position.x, position.y, circleRadius, 0, Math.PI * 2);
            ctx.fill();
            winningPosition[fieldIndex] = position;
        };

        // Draw content
        const drawContent = () => {
            ctx.font = `${fontWeight} ${fontSize} PingFang SC`;
            ctx.fillStyle = heighlight ? '#fff' : color;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(
                text < 0 ? Math.abs(text) : text,
                x + width / 2,
                y + height / 2
            );
        };

        if (heighlight) {
            drawHeighlight();
        } else {
            drawContent();
        }
    };

    const drawIssue = () => {
        drawColumn({
            text: issueTitle,
            width: issueSize,
            height: headHeight,
            x: startX,
            y: startY,
            bgColor: layerBg,
            fontSize: '40px',
            fontWeight: '500'
        });
        for (let i = 0; i < newData.issue.length; i++) {
            drawColumn({
                text: newData.issue[i].slice(-5),
                width: issueSize,
                height: columnHeignt,
                x: startX,
                y: headHeight + i * columnHeignt,
                bgColor: i % 2 === 0 ? defaultBg : layerBg,
                fontSize: contentSize
            });
        }
    };

    const drawTrend = () => {
        drawColumn({
            text: trendTitle[type - 1],
            width: columnWidth * 10,
            height: columnHeignt,
            x: issueSize,
            y: startY,
            bgColor: layerBg,
            fontSize: contentSize
        });
        for (let i = 1; i <= columns; i++) {
            drawColumn({
                text: i,
                width: columnWidth,
                height: columnHeignt,
                x: issueSize + columnWidth * (i - 1),
                y: columnHeignt,
                bgColor: layerBg,
                fontSize: contentSize
            });
        }
        for (let i = 0; i < newData.trendField[type].length; i++) {
            const row = newData.trendField[type][i];
            for (let num = 0; num < row.length; num++) {
                const rowData = row[num];
                drawColumn({
                    text: rowData,
                    width: columnWidth,
                    height: columnHeignt,
                    x: issueSize + columnWidth * i,
                    y: headHeight + columnHeignt * (row.length - num - 1),
                    bgColor: num % 2 === 0 ? layerBg : defaultBg,
                    fontSize: contentSize,
                    heighlight: rowData < 0,
                    fieldIndex: num
                });
            }
        }
    };

    const drawRedLine = () => {
        ctx.strokeStyle = '#F24848';
        ctx.lineWidth = 4;

        const leng = Object.keys(winningPosition).length;

        for (let i = 1; i < leng; i++) {
            ctx.beginPath();
            ctx.moveTo(winningPosition[i].x, winningPosition[i].y);
            ctx.lineTo(winningPosition[i - 1].x, winningPosition[i - 1].y);
            ctx.stroke();
        }

        for (let i = 0; i < leng; i++) {
            ctx.font = `400 ${contentSize} PingFang SC`;
            ctx.fillStyle = '#fff';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(
                Math.abs(winningPosition[i].text),
                winningPosition[i].x,
                winningPosition[i].y
            );
        }
    };

    const drawNotWin = () => {
        for (let i = 0; i < newData.trendField[type].length; i++) {
            const row = newData.trendField[type][i];
            for (let num = row.length - 1; num >= 0; num--) {
                const rowData = row[num];
                if (rowData < 0) break;
                drawColumn({
                    text: rowData,
                    width: columnWidth,
                    height: columnHeignt,
                    x: issueSize + columnWidth * i,
                    y: headHeight + columnHeignt * (row.length - num - 1),
                    bgColor: notWinBg,
                    fontSize: contentSize,
                    heighlight: rowData < 0,
                    fieldIndex: num
                });
            }
        }
    };

    const drawExtraData = () => {
        const issueLeng = newData.issue.length;
        const handleBg = idx => {
            if (issueLeng % 2 === 0) {
                return idx % 2 === 0;
            } else {
                return idx % 2 !== 0;
            }
        };
        for (let i = 0; i < extraField.length; i++) {
            drawColumn({
                text: extraField[i].title,
                width: issueSize,
                height: columnHeignt,
                x: startX,
                y: issueLeng * columnHeignt + headHeight + i * columnHeignt,
                bgColor: handleBg(i) ? defaultBg : layerBg,
                fontSize: contentSize,
                color: extraColor
            });
        }
        const extraData = newData.extra[type];
        for (let i = 0; i < extraData.length; i++) {
            for (let field = 0; field < extraField.length; field++) {
                drawColumn({
                    text: extraData[i][extraField[field].value],
                    width: columnWidth,
                    height: columnHeignt,
                    x: issueSize + columnWidth * i,
                    y:
                        issueLeng * columnHeignt +
                        headHeight +
                        field * columnHeignt,
                    bgColor: handleBg(field) ? defaultBg : layerBg,
                    fontSize: contentSize,
                    color: extraColor
                });
            }
        }
    };

    drawIssue();
    drawTrend();
    drawNotWin();
    drawRedLine();
    drawExtraData();
};
