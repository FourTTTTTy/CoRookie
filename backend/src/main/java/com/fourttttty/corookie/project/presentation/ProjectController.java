package com.fourttttty.corookie.project.presentation;

import com.fourttttty.corookie.config.security.LoginUser;
import com.fourttttty.corookie.project.application.service.ProjectService;
import com.fourttttty.corookie.project.dto.request.ProjectCreateRequest;
import com.fourttttty.corookie.project.dto.request.ProjectUpdateRequest;
import com.fourttttty.corookie.project.dto.response.ProjectResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/projects")
@RequiredArgsConstructor
public class ProjectController {
    private final ProjectService projectService;

    @GetMapping
    public ResponseEntity<List<ProjectResponse>> projectList() {
        return ResponseEntity.ok(projectService.findAll());
    }

    @GetMapping("/{projectId}")
    public ResponseEntity<ProjectResponse> projectDetail(@PathVariable Long projectId) {
        return ResponseEntity.ok(projectService.findById(projectId));
    }

    @PostMapping
    public ResponseEntity<ProjectResponse> projectCreate(@RequestBody @Validated ProjectCreateRequest request,
                                                         @AuthenticationPrincipal LoginUser loginUser) {
        return ResponseEntity.ok(projectService.create(request, loginUser.getMemberId()));
    }

    @PutMapping("/{projectId}")
    public ResponseEntity<ProjectResponse> projectModify(@PathVariable Long projectId,
                                                         @RequestBody
                                                         @Validated ProjectUpdateRequest request) {
        return ResponseEntity.ok(projectService.modify(request, projectId));
    }

    @DeleteMapping("/{projectId}")
    public ResponseEntity<Object> projectDelete(@PathVariable Long projectId) {
        projectService.deleteById(projectId);
        return ResponseEntity.noContent().build();
    }
}