import { resolve } from "path";
import { moveSync } from "fs-extra";

export const cleanupPath = (pluginOptions) => {
    const options = {
        ...pluginOptions,
    };
    let _config = {};

    return {
        name: "vite-plugin-cleanup-path",
        async config(userConfig) {
            _config = userConfig;
        },
        writeBundle(options, bundle) {
            Object.keys(bundle).forEach(key => {
                if (bundle[key].fileName.includes(pluginOptions)) {
                    moveSync(
                        resolve(__dirname, `../dist/${bundle[key].fileName}`),
                        resolve(__dirname, `../dist/${bundle[key].fileName.replace("views/", "")}`)
                    );
                }
                // delete views directory
            })
        }
    };
}