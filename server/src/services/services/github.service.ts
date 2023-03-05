/* eslint-disable no-console */
import { Injectable } from '@nestjs/common'
import { Octokit } from '@octokit/core'
import { ServicesService } from '../services.service'
import GithubIntegration from '../integrations/github.integration'
import type { Scenario } from '../../scenarios/entities/scenario.entity'

interface Commit {
    sha: string
    branch: string
    message: string
    htmlUrl: string
    repositoryUrl: string
    date: string
    author: {
        name: string
        email: string
    }
    committer: {
        name: string
        email: string
    }
}

@Injectable()
export class GithubService {

    Commits: {
        accountId: string
        scenarioId: string
        repositoryUrl: string
        commits: string[]
    }[]

    constructor(private readonly servicesService: ServicesService) {
        this.Commits = []
        this.servicesService.setIntegration(new GithubIntegration(this))
    }

    async getNewCommits(accountId: string, scenario: Scenario, accessToken: string): Promise<Commit[]> {
        try {
            const octokit = new Octokit({ auth: accessToken })

            const scenarioId = scenario.id
            const repositoryUrl = scenario.trigger.fields.find((x) => x.name === 'repository_url')?.value ?? ''
            const branch = scenario.trigger.fields.find((x) => x.name === 'branch')?.value ?? 'main'

            if (!repositoryUrl || !branch)
                return []
            const [owner, repo] = repositoryUrl.split('/').slice(-2)
            if (!owner || !repo)
                return []

            const { scenarioId: lastScenarioId, repositoryUrl: lastRepositoryUrl, commits: lastCommits }
                = this.Commits.find(
                    (x) => x.accountId === accountId && x.scenarioId === scenarioId
                ) ?? { scenarioId: '', repositoryUrl: '', commits: [] as string[] }

            const { data: commits } = await octokit.request('GET /repos/{owner}/{repo}/commits', {
                owner,
                repo,
                sha: branch
            })
            const newCommits = commits.filter((x) => !lastCommits.includes(x.sha))
                .map(({ sha, html_url, commit: { message, author, committer } }) => ({
                    sha,
                    branch,
                    message,
                    htmlUrl: html_url,
                    repositoryUrl,
                    date: committer?.date ?? author?.date ?? '',
                    author: {
                        name: author?.name ?? '',
                        email: author?.email ?? ''
                    },
                    committer: {
                        name: committer?.name ?? '',
                        email: committer?.email ?? ''
                    }
                }))

            this.Commits = [
                ...this.Commits.filter((x) => !(x.accountId === accountId && x.scenarioId === scenarioId)),
                { accountId, scenarioId, repositoryUrl, commits: commits.map((x) => x.sha) }
            ]

            if (lastScenarioId === scenarioId && lastRepositoryUrl === repositoryUrl)
                return newCommits
        } catch (error) {
            console.error(error)
        }
        return []
    }

    async triggerNewCommit(accountId: string, scenario: Scenario, commit: Commit) {
        const ingredients = new Map<string, string>([
            ['sha', commit.sha],
            ['branch', commit.branch],
            ['message', commit.message],
            ['html_url', commit.htmlUrl],
            ['repository_url', commit.repositoryUrl],
            ['date', commit.date],
            ['author_name', commit.author.name],
            ['author_email', commit.author.email],
            ['committer_name', commit.committer.name],
            ['committer_email', commit.committer.email]
        ])
        await this.servicesService.run(accountId, scenario, ingredients)
    }

    async createPullRequest(repositoryUrl: string, title: string, body: string, head: string, base: string, accessToken: string) {
        try {
            const octokit = new Octokit({ auth: accessToken })

            if (!repositoryUrl || !title || !head || !base)
                return
            const [owner, repo] = repositoryUrl.split('/').slice(-2)
            if (!owner || !repo)
                return

            await octokit.request('POST /repos/{owner}/{repo}/pulls', {
                owner,
                repo,
                title,
                body,
                head,
                base,
                headers: {
                    'X-GitHub-Api-Version': '2022-11-28'
                }
            })
        } catch (error) {
            console.error(error)
        }
    }

    async createIssue(repositoryUrl: string, title: string, body: string, milestone: string | undefined, accessToken: string) {
        try {
            const octokit = new Octokit({ auth: accessToken })

            if (!repositoryUrl || !title)
                return
            const [owner, repo] = repositoryUrl.split('/').slice(-2)
            if (!owner || !repo)
                return

            await octokit.request('POST /repos/{owner}/{repo}/issues', {
                owner,
                repo,
                title,
                body,
                milestone
            })
        } catch (error) {
            console.error(error)
        }
    }
}
