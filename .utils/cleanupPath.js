import { resolve } from "path";
import { moveSync } from "fs-extra";
import { writeFileSync } from "fs";

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
        writeBundle(bundleOptions, bundle) {
            Object.keys(bundle).forEach(key => {
                if (bundle[key].fileName.includes(options.views)) {
                    moveSync(
                        resolve(__dirname, `../dist/${bundle[key].fileName}`),
                        resolve(__dirname, `../dist/${bundle[key].fileName.replace("views/", "")}`)
                    );
                }
                // delete views directory
            });

            // write hash to file so other frameworks/cms/etc know the used hash value
            try {
                writeFileSync(`./${options.hashFile}`, `${JSON.stringify({ hash: options.hash })}\n`);
            } catch (err) {
                console.log(err);
            }
        }
    };
}