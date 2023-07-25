package com.fourttttty.corookie.issue.presentation;

import com.fourttttty.corookie.issue.application.service.IssueService;
import com.fourttttty.corookie.issue.dto.request.IssueCreateRequest;
import com.fourttttty.corookie.issue.dto.response.IssueDetailResponse;
import com.fourttttty.corookie.issue.dto.response.IssueListResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/projects/{projectId}/issues")
@RequiredArgsConstructor
public class IssueController {
    private final IssueService issueService;

    @GetMapping
    public ResponseEntity<List<IssueListResponse>> issueList(@PathVariable Long projectId,
                                                             @RequestParam Long memberId) {
        return ResponseEntity.ok(issueService.findByProjectId(projectId, memberId));
    }

    @GetMapping("/{issueId}")
    public ResponseEntity<IssueDetailResponse> issueDetail(@PathVariable Long projectId,
                                                           @PathVariable Long issueId,
                                                           @RequestParam Long memberId) {
        return ResponseEntity.ok(issueService.findById(issueId, projectId, memberId));
    }

    @PostMapping
    public ResponseEntity<IssueDetailResponse> issueCreate(@PathVariable Long projectId,
                                                           @RequestBody
                                                           @Validated
                                                           IssueCreateRequest issueCreateRequest,
                                                           @RequestParam Long memberId) {
        return ResponseEntity.ok(issueService.create(issueCreateRequest, projectId, memberId));
    }
}
