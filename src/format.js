export const formatChampionData = (data, rankingNumber) => {
    // init setting
    const newData = {
        issue: [],
        trendField: {},
        extra: {}
    };
    const dataLocation = data.length - 1;

    // init trendField
    for (let i = 1; i <= rankingNumber; i++) {
        newData.trendField[i] = Array.from({ length: rankingNumber }, () => []);
        newData.extra[i] = Array.from({ length: rankingNumber }, () => ({
            total: 0,
            maxMissing: 0,
            averageMissing: 0,
            maxContinuous: 0
        }));
    }

    // fill column value
    const record = {};
    for (let i = 0; i <= dataLocation; i++) {
        newData.issue.push(data[i].lotteryNum);

        for (let rank = 0; rank < rankingNumber; rank++) {
            const winNumber = data[dataLocation - i].results[rank];

            for (let column = 0; column < rankingNumber; column++) {
                const target = newData.trendField[rank + 1][column];
                const extra = newData.extra[rank + 1][column];
                if (column + 1 === winNumber) {
                    // total appearend value
                    extra.total += 1;
                    if (target[target.length - 1] < 0) {
                        record[`${rank + 1}${column}`] += 1;
                    } else {
                        record[`${rank + 1}${column}`] = 1;
                    }
                    target.push(-winNumber);
                    // Max continuous
                    extra.maxContinuous = Math.max(
                        extra.maxContinuous,
                        record[`${rank + 1}${column}`]
                    );
                } else {
                    const lastValue = target[target.length - 1];
                    target.push(
                        target.length === 0 || lastValue < 0 ? 1 : lastValue + 1
                    );
                }
                // Average missing value
                if (dataLocation === i) {
                    extra.averageMissing = Math.round(
                        data.length / (extra.total + 1)
                    );
                }
                // Max missing value
                extra.maxMissing = Math.max(
                    extra.maxMissing,
                    target[target.length - 1]
                );
            }
        }
    }

    return newData;
};
