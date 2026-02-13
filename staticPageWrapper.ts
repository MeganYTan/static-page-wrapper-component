import * as pulumi from "@pulumi/pulumi";
import { StaticPage } from "@pulumi/static-page-component";

export interface StaticPageWrapperArgs {
    title: pulumi.Input<string>;
    bodyText: pulumi.Input<string>;
}

export class StaticPageWrapper extends pulumi.ComponentResource {
    public readonly endpoint: pulumi.Output<string>;
    public readonly indexContent: pulumi.Output<string>;

    constructor(name: string, args: StaticPageWrapperArgs, opts?: pulumi.ComponentResourceOptions) {
        super("static-page-wrapper-component:index:StaticPageWrapper", name, args, opts);

        const indexContent = pulumi.interpolate`<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${args.title}</title>
</head>
<body>
  <main>
    <h1>${args.title}</h1>
    <p>${args.bodyText}</p>
  </main>
</body>
</html>`;

        const staticPage = new StaticPage(`${name}-site`, {
            indexContent: indexContent,
        }, { parent: this });

        this.indexContent = indexContent;
        this.endpoint = staticPage.endpoint;

        this.registerOutputs({
            endpoint: this.endpoint,
            indexContent: this.indexContent,
        });
    }
}
